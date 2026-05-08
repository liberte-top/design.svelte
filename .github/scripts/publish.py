#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import subprocess
import time
from pathlib import Path


REGISTRY = "https://packages.liberte.top/"


def fail(message: str) -> None:
    raise SystemExit(f"[publish] {message}")


def run(args: list[str], cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    print(f"[publish] {' '.join(args)}")
    return subprocess.run(args, cwd=cwd, check=False, text=True)


def run_checked(args: list[str], cwd: Path | None = None) -> None:
    result = run(args, cwd)
    if result.returncode != 0:
        fail(f"command failed with exit code {result.returncode}: {' '.join(args)}")


def read_dist_tag(package_name: str, tag: str) -> str | None:
    for attempt in range(1, 6):
        result = subprocess.run(
            ["npm", "view", package_name, f"dist-tags.{tag}", f"--registry={REGISTRY}", "--json"],
            check=False,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        if result.returncode != 0:
            fail(result.stderr.strip() or result.stdout.strip())
        output = result.stdout.strip()
        if output:
            return json.loads(output)
        if attempt < 5:
            time.sleep(2)
    return None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--package-dir", required=True)
    parser.add_argument("--package-name", required=True)
    parser.add_argument("--version", required=True)
    parser.add_argument("--tag", required=True)
    args = parser.parse_args()

    package_dir = Path(args.package_dir)
    manifest_path = package_dir / "package.json"
    manifest = json.loads(manifest_path.read_text())
    if manifest.get("name") != args.package_name:
        fail(f"{manifest_path} name mismatch")

    original = manifest_path.read_text()
    try:
        manifest["version"] = args.version
        manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")

        run_checked(["pnpm", "format"], package_dir)
        run_checked(["pnpm", "lint"], package_dir)
        run_checked(["pnpm", "build"], package_dir)
        run_checked(["npm", "publish", "--tag", args.tag, f"--registry={REGISTRY}"], package_dir)

        published = read_dist_tag(args.package_name, args.tag)
        if published != args.version:
            fail(f"dist-tag {args.tag} points to {published}, expected {args.version}")
    finally:
        manifest_path.write_text(original)


if __name__ == "__main__":
    main()
