#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
from pathlib import Path


PACKAGES = {
    "components": {
        "dir": "packages/components",
        "name": "@liberte/svelte-components",
    },
    "icons": {
        "dir": "packages/icons",
        "name": "@liberte/svelte-icons",
    },
}

STABLE_RE = re.compile(r"^(\d+)\.(\d+)\.(\d+)$")
BETA_RE = re.compile(r"^(\d+\.\d+\.\d+)-beta\.(\d+)$")
REGISTRY = "https://packages.liberte.top/"


def fail(message: str) -> None:
    raise SystemExit(f"[version] {message}")


def run(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, check=False, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def read_manifest(package_key: str) -> tuple[dict[str, object], Path]:
    entry = PACKAGES.get(package_key)
    if entry is None:
        fail(f"unknown package: {package_key}")
    path = Path(entry["dir"]) / "package.json"
    data = json.loads(path.read_text())
    if data.get("name") != entry["name"]:
        fail(f"{path} name must be {entry['name']}")
    version = data.get("version")
    if not isinstance(version, str) or STABLE_RE.match(version) is None:
        fail(f"{path} version must be stable x.y.z")
    return data, path


def npm_json(args: list[str]) -> object | None:
    result = run(["npm", *args, f"--registry={REGISTRY}", "--json"])
    if result.returncode != 0:
        if "E404" in result.stderr:
            return None
        fail(result.stderr.strip() or result.stdout.strip())
    output = result.stdout.strip()
    return json.loads(output) if output else None


def write_output(name: str, value: str) -> None:
    output = os.environ.get("GITHUB_OUTPUT")
    if output:
        with open(output, "a", encoding="utf-8") as handle:
            handle.write(f"{name}={value}\n")


def version_tuple(value: str) -> tuple[int, int, int]:
    match = STABLE_RE.match(value)
    if match is None:
        fail(f"invalid stable version: {value}")
    return tuple(int(part) for part in match.groups())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--package", required=True, choices=sorted(PACKAGES))
    parser.add_argument("--channel", required=True, choices=["beta", "stable"])
    args = parser.parse_args()

    manifest, manifest_path = read_manifest(args.package)
    package_name = str(manifest["name"])
    base_version = str(manifest["version"])
    release_version = base_version
    dist_tag = "latest"

    tags = npm_json(["view", package_name, "dist-tags"]) or {}
    if not isinstance(tags, dict):
        fail(f"unexpected dist-tags payload for {package_name}")

    latest = tags.get("latest")
    if args.channel == "stable":
        if isinstance(latest, str) and STABLE_RE.match(latest):
            if version_tuple(base_version) <= version_tuple(latest):
                fail(f"{base_version} must be greater than current latest {latest}")
    else:
        dist_tag = "beta"
        beta_number = 1
        beta = tags.get("beta")
        if isinstance(beta, str):
            match = BETA_RE.match(beta)
            if match and match.group(1) == base_version:
                beta_number = int(match.group(2)) + 1
        release_version = f"{base_version}-beta.{beta_number}"

    print(f"[version] package: {package_name}")
    print(f"[version] base version: {base_version}")
    print(f"[version] release version: {release_version}")
    print(f"[version] dist-tag: {dist_tag}")

    write_output("base_version", base_version)
    write_output("dist_tag", dist_tag)
    write_output("package_dir", str(manifest_path.parent))
    write_output("package_name", package_name)
    write_output("release_version", release_version)


if __name__ == "__main__":
    main()
