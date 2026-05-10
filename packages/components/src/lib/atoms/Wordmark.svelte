<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import Mark from "./Mark.svelte";

  /**
   * Brand wordmark / link. Plain text styled as the product wordmark.
   * Used in app shells, layouts, footers — anywhere the brand name appears
   * as a navigable but non-button-shaped element.
   *
   * `mark` prop renders a brand glyph before the text (sized to match).
   */
  type Size = "sm" | "md" | "lg";

  type Props = HTMLAnchorAttributes & {
    size?: Size;
    mark?: boolean;
    children?: import("svelte").Snippet;
  };

  let {
    size = "md",
    mark = false,
    children,
    href = "/",
    class: className = "",
    ...rest
  }: Props = $props();

  const markSize = $derived(size === "lg" ? "md" : "sm");
</script>

<a
  {...rest}
  {href}
  class={`lt-wordmark lt-wordmark--${size} ${className}`.trim()}
>
  {#if mark}
    <Mark size={markSize} tone="brand" />
  {/if}
  <span class="lt-wordmark__text">
    {@render children?.()}
  </span>
</a>

<style>
  .lt-wordmark {
    display: inline-flex;
    align-items: center;
    gap: var(--lt-space-2);
    color: var(--lt-color-text-primary);
    font-family: var(--lt-font-family-display);
    font-weight: var(--lt-font-weight-bold);
    letter-spacing: var(--lt-tracking-tight);
    line-height: 1;
    text-decoration: none;
    transition:
      color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      transform var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-wordmark:hover {
    color: var(--lt-color-text-secondary);
    text-decoration: none;
  }

  .lt-wordmark:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 4px;
    border-radius: var(--lt-radius-xs);
  }

  .lt-wordmark__text {
    display: inline-block;
  }

  .lt-wordmark--sm {
    font-size: var(--lt-text-md);
  }
  .lt-wordmark--md {
    font-size: var(--lt-text-base);
  }
  .lt-wordmark--lg {
    font-size: var(--lt-text-xl);
    letter-spacing: var(--lt-tracking-tightest);
  }
</style>
