<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLTimeElement> & {
    iso: string;
    /** Absolute fallback shown if iso fails to parse. */
    fallback?: string;
    /** Refresh cadence in ms. Defaults to 60s (matches "minute" precision). */
    refreshMs?: number;
  };

  let {
    iso,
    fallback = "—",
    refreshMs = 60_000,
    class: className = "",
    title: titleProp,
    ...rest
  }: Props = $props();

  let now = $state(Date.now());

  onMount(() => {
    const handle = setInterval(() => {
      now = Date.now();
    }, refreshMs);
    return () => clearInterval(handle);
  });

  const parsed = $derived.by(() => {
    const ms = Date.parse(iso);
    return Number.isFinite(ms) ? ms : null;
  });

  const absolute = $derived.by(() => {
    if (parsed === null) return fallback;
    try {
      return new Date(parsed).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  });

  const relative = $derived.by(() => {
    if (parsed === null) return fallback;
    const diffMs = parsed - now;
    const sign = diffMs >= 0 ? 1 : -1;
    const abs = Math.abs(diffMs);

    const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
      ["year", 365 * 24 * 60 * 60 * 1000],
      ["month", 30 * 24 * 60 * 60 * 1000],
      ["week", 7 * 24 * 60 * 60 * 1000],
      ["day", 24 * 60 * 60 * 1000],
      ["hour", 60 * 60 * 1000],
      ["minute", 60 * 1000],
    ];

    try {
      const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
      for (const [unit, msPerUnit] of units) {
        if (abs >= msPerUnit) {
          return rtf.format(sign * Math.round(abs / msPerUnit), unit);
        }
      }
      return rtf.format(sign * Math.max(1, Math.round(abs / 1000)), "second");
    } catch {
      return absolute;
    }
  });
</script>

<time
  {...rest}
  datetime={iso}
  title={titleProp ?? absolute}
  class={`lt-relative-time ${className}`.trim()}
>
  {relative}
</time>

<style>
  .lt-relative-time {
    color: inherit;
    font-variant-numeric: tabular-nums;
    cursor: help;
    text-decoration: underline dotted var(--lt-color-border);
    text-underline-offset: 3px;
  }
</style>
