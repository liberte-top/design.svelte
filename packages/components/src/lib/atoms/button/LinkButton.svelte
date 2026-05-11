<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type LinkButtonVariant = "primary" | "secondary" | "ghost";
  type LinkButtonSize = "sm" | "md" | "lg";

  type Props = HTMLAnchorAttributes & {
    variant?: LinkButtonVariant;
    size?: LinkButtonSize;
    block?: boolean;
    children?: import("svelte").Snippet;
  };

  let {
    variant = "primary",
    size = "md",
    block = false,
    children,
    class: className = "",
    href = "#",
    ...restProps
  }: Props = $props();
</script>

<a
  {...restProps}
  {href}
  class={`lt-link-button lt-link-button--${variant} lt-link-button--${size} ${block ? "lt-link-button--block" : ""} ${className}`.trim()}
>
  {@render children?.()}
</a>

<style>
  .lt-link-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--lt-space-2);
    border: 1px solid transparent;
    border-radius: var(--lt-radius-md);
    padding-inline: var(--lt-space-4);
    font-weight: var(--lt-font-weight-strong);
    line-height: 1;
    letter-spacing: -0.005em;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    transition:
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      border-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      box-shadow var(--lt-motion-duration-fast) var(--lt-motion-ease),
      transform var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-link-button:hover {
    text-decoration: none;
  }

  .lt-link-button:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
  }

  .lt-link-button--block {
    display: flex;
    width: 100%;
  }

  .lt-link-button--sm {
    min-height: var(--lt-control-height-sm);
    padding-inline: var(--lt-space-3);
    font-size: var(--lt-text-sm);
  }

  .lt-link-button--md {
    min-height: var(--lt-control-height);
    font-size: var(--lt-text-md);
  }

  .lt-link-button--lg {
    min-height: var(--lt-control-height-lg);
    padding-inline: var(--lt-space-5);
    font-size: var(--lt-text-base);
  }

  .lt-link-button--primary {
    background: var(--lt-color-brand);
    border-color: var(--lt-color-brand);
    color: var(--lt-color-on-brand);
    box-shadow: var(--lt-shadow-press);
  }
  .lt-link-button--primary:hover {
    background: var(--lt-color-brand-hover);
    border-color: var(--lt-color-brand-hover);
    color: var(--lt-color-on-brand);
    transform: translateY(-1px);
    box-shadow:
      var(--lt-shadow-press),
      0 6px 16px rgb(53 81 214 / 22%);
  }
  .lt-link-button--primary:active {
    transform: translateY(0);
    background: var(--lt-color-brand-active);
    border-color: var(--lt-color-brand-active);
    box-shadow: var(--lt-shadow-press);
  }

  .lt-link-button--secondary {
    background: var(--lt-color-surface);
    border-color: var(--lt-color-border);
    color: var(--lt-color-text-primary);
  }
  .lt-link-button--secondary:hover {
    background: var(--lt-color-surface-muted);
    border-color: var(--lt-color-border-strong);
    color: var(--lt-color-text-primary);
  }
  .lt-link-button--secondary:active {
    background: var(--lt-color-surface-pressed);
  }

  .lt-link-button--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--lt-color-text-secondary);
  }
  .lt-link-button--ghost:hover {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
  }
  .lt-link-button--ghost:active {
    background: var(--lt-color-surface-pressed);
  }
</style>
