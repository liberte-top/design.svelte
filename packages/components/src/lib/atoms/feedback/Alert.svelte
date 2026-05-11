<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type Tone = "info" | "success" | "warning" | "danger" | "error";

  type Props = HTMLAttributes<HTMLDivElement> & {
    tone?: Tone;
    children?: import("svelte").Snippet;
  };

  let {
    tone = "info",
    children,
    class: className = "",
    ...rest
  }: Props = $props();

  // backwards compat: "error" alias for "danger"
  const resolvedTone = $derived(tone === "error" ? "danger" : tone);
</script>

<div {...rest} class={`lt-alert lt-alert--${resolvedTone} ${className}`.trim()}>
  {@render children?.()}
</div>

<style>
  .lt-alert {
    display: block;
    border: 1px solid;
    border-radius: var(--lt-radius-md);
    padding: var(--lt-space-3) var(--lt-space-4);
    font-size: var(--lt-text-md);
    line-height: var(--lt-leading-snug);
  }

  .lt-alert--info {
    background: var(--lt-color-surface-info);
    border-color: var(--lt-color-border-info);
    color: var(--lt-color-text-info);
  }

  .lt-alert--success {
    background: var(--lt-color-surface-success);
    border-color: var(--lt-color-border-success);
    color: var(--lt-color-text-success);
  }

  .lt-alert--warning {
    background: var(--lt-color-surface-warning);
    border-color: var(--lt-color-border-warning);
    color: var(--lt-color-text-warning);
  }

  .lt-alert--danger {
    background: var(--lt-color-surface-danger);
    border-color: var(--lt-color-border-danger);
    color: var(--lt-color-text-danger);
  }
</style>
