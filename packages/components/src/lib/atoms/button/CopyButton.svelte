<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Variant = "primary" | "secondary" | "ghost";
  type Size = "sm" | "md" | "lg";

  type Props = Omit<HTMLButtonAttributes, "onclick"> & {
    value: string;
    label?: string;
    copiedLabel?: string;
    variant?: Variant;
    size?: Size;
    iconOnly?: boolean;
    onCopied?: () => void;
  };

  let {
    value,
    label = "Copy",
    copiedLabel = "Copied",
    variant = "secondary",
    size = "sm",
    iconOnly = false,
    onCopied,
    class: className = "",
    disabled,
    "aria-label": ariaLabel,
    ...rest
  }: Props = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | null = null;

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      onCopied?.();
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        copied = false;
      }, 1800);
    } catch {
      copied = false;
    }
  }

  const iconSize = $derived(size === "sm" ? 14 : size === "lg" ? 18 : 16);
</script>

<button
  {...rest}
  type="button"
  {disabled}
  onclick={handleClick}
  aria-label={iconOnly ? (copied ? copiedLabel : label) : ariaLabel}
  class={`lt-copy-button lt-copy-button--${variant} lt-copy-button--${size} ${copied ? "lt-copy-button--copied" : ""} ${iconOnly ? "lt-copy-button--icon-only" : ""} ${className}`.trim()}
>
  {#if copied}
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  {:else}
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  {/if}
  {#if !iconOnly}
    <span>{copied ? copiedLabel : label}</span>
  {/if}
</button>

<style>
  .lt-copy-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--lt-space-2);
    border: 1px solid transparent;
    border-radius: var(--lt-radius-md);
    padding-inline: var(--lt-space-3);
    font-family: inherit;
    font-weight: var(--lt-font-weight-medium);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    transition:
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      border-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-copy-button:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
  }

  .lt-copy-button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .lt-copy-button--sm {
    min-height: var(--lt-control-height-sm);
    font-size: var(--lt-text-sm);
  }
  .lt-copy-button--md {
    min-height: var(--lt-control-height);
    font-size: var(--lt-text-md);
  }
  .lt-copy-button--lg {
    min-height: var(--lt-control-height-lg);
    font-size: var(--lt-text-base);
    padding-inline: var(--lt-space-4);
  }

  .lt-copy-button--icon-only {
    padding-inline: 0;
    aspect-ratio: 1 / 1;
  }

  .lt-copy-button--primary {
    background: var(--lt-color-brand);
    border-color: var(--lt-color-brand);
    color: var(--lt-color-on-brand);
  }
  .lt-copy-button--primary:hover:not(:disabled) {
    background: var(--lt-color-brand-hover);
    border-color: var(--lt-color-brand-hover);
  }

  .lt-copy-button--secondary {
    background: var(--lt-color-surface);
    border-color: var(--lt-color-border);
    color: var(--lt-color-text-primary);
  }
  .lt-copy-button--secondary:hover:not(:disabled) {
    background: var(--lt-color-surface-muted);
    border-color: var(--lt-color-border-strong);
  }

  .lt-copy-button--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--lt-color-text-secondary);
  }
  .lt-copy-button--ghost:hover:not(:disabled) {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
  }

  .lt-copy-button--copied {
    background: var(--lt-color-surface-success) !important;
    border-color: var(--lt-color-border-success) !important;
    color: var(--lt-color-text-success) !important;
  }
</style>
