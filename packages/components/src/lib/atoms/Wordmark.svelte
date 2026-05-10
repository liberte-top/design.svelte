<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  /**
   * Brand wordmark / link. Plain text styled as the product wordmark.
   * Used in app shells, layouts, footers — anywhere the brand name appears
   * as a navigable but non-button-shaped element.
   */
  type Size = "sm" | "md" | "lg";

  type Props = HTMLAnchorAttributes & {
    size?: Size;
    children?: import("svelte").Snippet;
  };

  let {
    size = "md",
    children,
    href = "/",
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<a
  {...rest}
  {href}
  class={`lt-wordmark lt-wordmark--${size} ${className}`.trim()}
>
  {@render children?.()}
</a>

<style>
  .lt-wordmark {
    color: var(--lt-color-text-primary);
    font-family: var(--lt-font-family-display);
    font-weight: var(--lt-font-weight-strong);
    letter-spacing: var(--lt-tracking-tight);
    line-height: 1;
    text-decoration: none;
    transition: color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-wordmark:hover {
    color: var(--lt-color-text-secondary);
    text-decoration: none;
  }

  .lt-wordmark:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
    border-radius: var(--lt-radius-xs);
  }

  .lt-wordmark--sm {
    font-size: var(--lt-text-md);
  }
  .lt-wordmark--md {
    font-size: var(--lt-text-base);
  }
  .lt-wordmark--lg {
    font-size: var(--lt-text-lg);
  }
</style>
