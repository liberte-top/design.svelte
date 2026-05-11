<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Variant = "ghost" | "secondary";
  type Size = "sm" | "md";

  type Props = HTMLButtonAttributes & {
    variant?: Variant;
    size?: Size;
    children?: import("svelte").Snippet;
  };

  let {
    variant = "ghost",
    size = "md",
    children,
    class: className = "",
    type = "button",
    ...rest
  }: Props = $props();
</script>

<button
  {...rest}
  {type}
  class={`lt-icon-button lt-icon-button--${variant} lt-icon-button--${size} ${className}`.trim()}
>
  {@render children?.()}
</button>

<style>
  .lt-icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: var(--lt-radius-md);
    color: var(--lt-color-text-secondary);
    cursor: pointer;
    transition:
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      border-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-icon-button:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
  }

  .lt-icon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lt-icon-button--sm {
    width: var(--lt-control-height-sm);
    height: var(--lt-control-height-sm);
  }

  .lt-icon-button--md {
    width: var(--lt-control-height);
    height: var(--lt-control-height);
  }

  .lt-icon-button--ghost {
    background: transparent;
  }
  .lt-icon-button--ghost:hover:not(:disabled) {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
  }

  .lt-icon-button--secondary {
    background: var(--lt-color-surface);
    border-color: var(--lt-color-border);
    color: var(--lt-color-text-primary);
  }
  .lt-icon-button--secondary:hover:not(:disabled) {
    background: var(--lt-color-surface-muted);
    border-color: var(--lt-color-border-strong);
  }
</style>
