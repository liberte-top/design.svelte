<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  /**
   * Sidebar / drawer navigation entry. Renders an anchor — the consumer
   * supplies href (hash or pathname). When `active` is true the row picks
   * up the brand-tinted active background; otherwise it stays neutral and
   * only highlights on hover.
   */
  type Size = "sm" | "md";

  type Props = HTMLAnchorAttributes & {
    active?: boolean;
    size?: Size;
    icon?: import("svelte").Snippet;
    children?: import("svelte").Snippet;
  };

  let {
    active = false,
    size = "md",
    icon,
    children,
    href = "#",
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<a
  {...rest}
  {href}
  class={`lt-navitem lt-navitem--${size} ${active ? "lt-navitem--active" : ""} ${className}`.trim()}
  aria-current={active ? "page" : undefined}
>
  {#if icon}
    <span class="lt-navitem__icon" aria-hidden="true">{@render icon()}</span>
  {/if}
  <span class="lt-navitem__label">{@render children?.()}</span>
</a>

<style>
  .lt-navitem {
    display: inline-flex;
    align-items: center;
    gap: var(--lt-space-2);
    width: 100%;
    padding: var(--lt-space-2) var(--lt-space-3);
    border-radius: var(--lt-radius-md);
    color: var(--lt-color-text-secondary);
    text-decoration: none;
    font-weight: var(--lt-font-weight-medium);
    line-height: 1.4;
    transition:
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-navitem:hover {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
    text-decoration: none;
  }

  .lt-navitem:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
  }

  .lt-navitem--active {
    background: var(--lt-color-brand-soft);
    color: var(--lt-color-brand);
  }

  .lt-navitem--active:hover {
    background: var(--lt-color-brand-soft-hover);
    color: var(--lt-color-brand);
  }

  .lt-navitem--sm {
    font-size: var(--lt-text-sm);
    padding-block: 6px;
  }

  .lt-navitem--md {
    font-size: var(--lt-text-md);
  }

  .lt-navitem__icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  .lt-navitem__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
