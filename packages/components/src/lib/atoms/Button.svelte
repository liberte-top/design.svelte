<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Variant = "primary" | "secondary" | "ghost";
  type Size = "sm" | "md" | "lg";

  type Props = HTMLButtonAttributes & {
    variant?: Variant;
    size?: Size;
    block?: boolean;
    children?: import("svelte").Snippet;
  };

  let {
    variant = "primary",
    size = "md",
    block = false,
    children,
    class: className = "",
    type = "button",
    ...rest
  }: Props = $props();
</script>

<button
  {...rest}
  {type}
  class={`lt-button lt-button--${variant} lt-button--${size} ${block ? "lt-button--block" : ""} ${className}`.trim()}
>
  {@render children?.()}
</button>

<style>
  .lt-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--lt-space-2);
    border: 1px solid transparent;
    border-radius: var(--lt-radius-md);
    padding-inline: var(--lt-space-4);
    font-weight: var(--lt-font-weight-strong);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      border-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      transform var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-button:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
  }

  .lt-button:active:not(:disabled) {
    transform: translateY(1px);
  }

  .lt-button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .lt-button--sm {
    min-height: var(--lt-control-height-sm);
    padding-inline: var(--lt-space-3);
    font-size: var(--lt-text-sm);
  }

  .lt-button--md {
    min-height: var(--lt-control-height);
    font-size: var(--lt-text-md);
  }

  .lt-button--lg {
    min-height: var(--lt-control-height-lg);
    padding-inline: var(--lt-space-5);
    font-size: var(--lt-text-base);
  }

  .lt-button--block {
    display: flex;
    width: 100%;
  }

  .lt-button--primary {
    background: var(--lt-color-brand);
    border-color: var(--lt-color-brand);
    color: var(--lt-color-on-brand);
  }
  .lt-button--primary:hover:not(:disabled) {
    background: var(--lt-color-brand-hover);
    border-color: var(--lt-color-brand-hover);
  }

  .lt-button--secondary {
    background: var(--lt-color-surface);
    border-color: var(--lt-color-border);
    color: var(--lt-color-text-primary);
  }
  .lt-button--secondary:hover:not(:disabled) {
    background: var(--lt-color-surface-muted);
    border-color: var(--lt-color-border-strong);
  }

  .lt-button--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--lt-color-text-secondary);
  }
  .lt-button--ghost:hover:not(:disabled) {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
  }
</style>
