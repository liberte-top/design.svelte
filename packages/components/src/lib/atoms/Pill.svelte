<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type Tone = "neutral" | "info" | "success" | "warning" | "danger";
  type Size = "sm" | "md";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    tone?: Tone;
    size?: Size;
    children?: import("svelte").Snippet;
  };

  let {
    tone = "neutral",
    size = "sm",
    children,
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<span
  {...rest}
  class={`lt-pill lt-pill--${tone} lt-pill--${size} ${className}`.trim()}
>
  {@render children?.()}
</span>

<style>
  .lt-pill {
    display: inline-flex;
    align-items: center;
    gap: var(--lt-space-1);
    border: 1px solid;
    border-radius: var(--lt-radius-pill);
    font-weight: var(--lt-font-weight-medium);
    line-height: 1.4;
    white-space: nowrap;
    vertical-align: baseline;
  }

  .lt-pill--sm {
    padding: 1px var(--lt-space-2);
    font-size: var(--lt-text-xs);
  }

  .lt-pill--md {
    padding: 3px var(--lt-space-3);
    font-size: var(--lt-text-sm);
  }

  .lt-pill--neutral {
    background: var(--lt-color-surface-muted);
    border-color: var(--lt-color-border-subtle);
    color: var(--lt-color-text-tertiary);
  }

  .lt-pill--info {
    background: var(--lt-color-surface-info);
    border-color: var(--lt-color-border-info);
    color: var(--lt-color-text-info);
  }

  .lt-pill--success {
    background: var(--lt-color-surface-success);
    border-color: var(--lt-color-border-success);
    color: var(--lt-color-text-success);
  }

  .lt-pill--warning {
    background: var(--lt-color-surface-warning);
    border-color: var(--lt-color-border-warning);
    color: var(--lt-color-text-warning);
  }

  .lt-pill--danger {
    background: var(--lt-color-surface-danger);
    border-color: var(--lt-color-border-danger);
    color: var(--lt-color-text-danger);
  }
</style>
