<script lang="ts">
  /**
   * Brand mark — geometric SVG glyph used standalone or beside a Wordmark.
   * Renders a rounded brand-tinted square with an inset ascending arrow,
   * conveying lift / liberation at any size.
   *
   * `tone="brand"` uses the live brand token (theme-aware).
   * `tone="ink"`   inverts: subtle outline on the current text color.
   */
  type Size = "sm" | "md" | "lg";
  type Tone = "brand" | "ink";

  type Props = {
    size?: Size;
    tone?: Tone;
    label?: string;
  };

  let { size = "md", tone = "brand", label }: Props = $props();

  const px = $derived(size === "sm" ? 18 : size === "lg" ? 28 : 22);
</script>

<svg
  class={`lt-mark lt-mark--${tone}`}
  width={px}
  height={px}
  viewBox="0 0 24 24"
  role={label ? "img" : "presentation"}
  aria-label={label}
  aria-hidden={label ? undefined : "true"}
>
  <rect class="lt-mark__bg" x="2" y="2" width="20" height="20" rx="6" />
  <path
    class="lt-mark__glyph"
    d="M8.5 14.5 L14.5 8.5 M10.5 8.5 L14.5 8.5 L14.5 12.5"
    fill="none"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style>
  .lt-mark {
    display: inline-block;
    flex-shrink: 0;
    transition:
      transform var(--lt-motion-duration-fast) var(--lt-motion-ease),
      filter var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-mark--brand .lt-mark__bg {
    fill: var(--lt-color-brand);
  }
  .lt-mark--brand .lt-mark__glyph {
    stroke: var(--lt-color-on-brand);
  }

  .lt-mark--ink .lt-mark__bg {
    fill: transparent;
    stroke: var(--lt-color-text-primary);
    stroke-width: 1.5;
  }
  .lt-mark--ink .lt-mark__glyph {
    stroke: var(--lt-color-text-primary);
  }
</style>
