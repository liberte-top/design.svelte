<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type Tone = "neutral" | "info" | "success" | "warning" | "danger" | "accent";
  type Size = "sm" | "md";
  type Variant = "soft" | "solid" | "outline";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    tone?: Tone;
    size?: Size;
    variant?: Variant;
    children?: import("svelte").Snippet;
  };

  let {
    tone = "neutral",
    size = "sm",
    variant = "soft",
    children,
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<span
  {...rest}
  class={`lt-pill lt-pill--${tone} lt-pill--${size} lt-pill--${variant} ${className}`.trim()}
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
    letter-spacing: -0.005em;
  }

  .lt-pill--sm {
    padding: 1px var(--lt-space-2);
    font-size: var(--lt-text-xs);
  }

  .lt-pill--md {
    padding: 3px var(--lt-space-3);
    font-size: var(--lt-text-sm);
  }

  /* --- soft (default): tinted bg + matching border + ink color --------- */

  .lt-pill--soft.lt-pill--neutral {
    background: var(--lt-color-surface-muted);
    border-color: var(--lt-color-border);
    color: var(--lt-color-text-secondary);
  }

  .lt-pill--soft.lt-pill--accent,
  .lt-pill--soft.lt-pill--info {
    background: var(--lt-color-surface-info);
    border-color: var(--lt-color-border-info);
    color: var(--lt-color-text-info);
  }

  .lt-pill--soft.lt-pill--success {
    background: var(--lt-color-surface-success);
    border-color: var(--lt-color-border-success);
    color: var(--lt-color-text-success);
  }

  .lt-pill--soft.lt-pill--warning {
    background: var(--lt-color-surface-warning);
    border-color: var(--lt-color-border-warning);
    color: var(--lt-color-text-warning);
  }

  .lt-pill--soft.lt-pill--danger {
    background: var(--lt-color-surface-danger);
    border-color: var(--lt-color-border-danger);
    color: var(--lt-color-text-danger);
  }

  /* --- solid: filled bg + on-tone ink ---------------------------------- */

  .lt-pill--solid {
    border-color: transparent;
  }

  .lt-pill--solid.lt-pill--neutral {
    background: var(--lt-color-surface-strong);
    color: var(--lt-color-text-primary);
  }

  .lt-pill--solid.lt-pill--accent,
  .lt-pill--solid.lt-pill--info {
    background: var(--lt-color-brand);
    color: var(--lt-color-on-brand);
  }

  .lt-pill--solid.lt-pill--success {
    background: var(--lt-color-text-success);
    color: var(--lt-color-on-brand);
  }

  .lt-pill--solid.lt-pill--warning {
    background: var(--lt-color-text-warning);
    color: var(--lt-color-on-brand);
  }

  .lt-pill--solid.lt-pill--danger {
    background: var(--lt-color-text-danger);
    color: var(--lt-color-on-brand);
  }

  /* --- outline: hairline border, transparent bg ------------------------ */

  .lt-pill--outline {
    background: transparent;
  }

  .lt-pill--outline.lt-pill--neutral {
    border-color: var(--lt-color-border);
    color: var(--lt-color-text-secondary);
  }

  .lt-pill--outline.lt-pill--accent,
  .lt-pill--outline.lt-pill--info {
    border-color: var(--lt-color-border-info);
    color: var(--lt-color-text-info);
  }

  .lt-pill--outline.lt-pill--success {
    border-color: var(--lt-color-border-success);
    color: var(--lt-color-text-success);
  }

  .lt-pill--outline.lt-pill--warning {
    border-color: var(--lt-color-border-warning);
    color: var(--lt-color-text-warning);
  }

  .lt-pill--outline.lt-pill--danger {
    border-color: var(--lt-color-border-danger);
    color: var(--lt-color-text-danger);
  }
</style>
