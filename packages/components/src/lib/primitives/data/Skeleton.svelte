<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type Shape = "text" | "rect" | "circle";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    shape?: Shape;
    width?: string;
    height?: string;
    animated?: boolean;
  };

  let {
    shape = "text",
    width,
    height,
    animated = true,
    class: className = "",
    style: styleProp = "",
    ...rest
  }: Props = $props();

  const sizeStyle = $derived(
    [
      width ? `width: ${width};` : "",
      height ? `height: ${height};` : "",
      styleProp,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<span
  {...rest}
  aria-hidden="true"
  class={`lt-skeleton lt-skeleton--${shape} ${animated ? "lt-skeleton--animated" : ""} ${className}`.trim()}
  style={sizeStyle}
></span>

<style>
  .lt-skeleton {
    display: inline-block;
    background-color: var(--lt-color-surface-strong);
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      var(--lt-color-surface-hover) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    border-radius: var(--lt-radius-sm);
    vertical-align: middle;
  }

  .lt-skeleton--text {
    height: 0.85em;
    width: 100%;
    border-radius: var(--lt-radius-xs);
  }

  .lt-skeleton--rect {
    width: 100%;
    height: 1.5rem;
    border-radius: var(--lt-radius-md);
  }

  .lt-skeleton--circle {
    width: 2rem;
    height: 2rem;
    border-radius: var(--lt-radius-pill);
  }

  .lt-skeleton--animated {
    animation: lt-skeleton-shimmer 1.4s ease-in-out infinite;
  }

  @keyframes lt-skeleton-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lt-skeleton--animated {
      animation: none;
    }
  }
</style>
