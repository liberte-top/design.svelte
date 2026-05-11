<script lang="ts">
  /**
   * Pure-CSS rotating spinner. Use inline (replaces "Loading…" copy) or
   * inside Buttons to indicate in-flight requests. Inherits color via
   * `currentColor` so it adapts to whichever atom hosts it.
   */
  type Size = "sm" | "md" | "lg";
  type Tone = "current" | "muted" | "accent";

  type Props = {
    size?: Size;
    tone?: Tone;
    label?: string;
  };

  let { size = "md", tone = "current", label = "Loading" }: Props = $props();
</script>

<span
  class={`lt-spinner lt-spinner--${size} lt-spinner--${tone}`}
  role="status"
  aria-label={label}
></span>

<style>
  .lt-spinner {
    display: inline-block;
    border-radius: var(--lt-radius-pill);
    border-style: solid;
    border-color: currentColor transparent currentColor transparent;
    animation: lt-spinner-rotate 800ms linear infinite;
    vertical-align: middle;
  }

  .lt-spinner--sm {
    width: 12px;
    height: 12px;
    border-width: 1.5px;
  }
  .lt-spinner--md {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }
  .lt-spinner--lg {
    width: 22px;
    height: 22px;
    border-width: 2.5px;
  }

  .lt-spinner--current {
    color: currentColor;
  }
  .lt-spinner--muted {
    color: var(--lt-color-text-tertiary);
  }
  .lt-spinner--accent {
    color: var(--lt-color-brand);
  }

  @keyframes lt-spinner-rotate {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lt-spinner {
      animation-duration: 1600ms;
    }
  }
</style>
