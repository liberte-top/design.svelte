<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type PillTone = "neutral" | "info" | "success" | "danger";

  type Props = HTMLAttributes<HTMLSpanElement> & {
    tone?: PillTone;
    children?: import("svelte").Snippet;
  };

  let {
    tone = "neutral",
    children,
    class: className = "",
    ...restProps
  }: Props = $props();
</script>

<span {...restProps} class={`lt-pill lt-pill--${tone} ${className}`.trim()}>
  {@render children?.()}
</span>

<style>
  .lt-pill {
    --_pill-padding-block: var(--lt-pill-padding-block, 0.125rem);
    --_pill-padding-inline: var(--lt-pill-padding-inline, 0.5rem);
    --_pill-font-size: var(--lt-pill-font-size, 0.75rem);
    --_pill-line-height: var(--lt-pill-line-height, 1.4);
    --_pill-font-weight: var(
      --lt-pill-font-weight,
      var(--lt-font-weight-strong, 600)
    );
    --_pill-radius: var(--lt-pill-radius, 999px);
    --_pill-border-width: var(--lt-pill-border-width, 1px);
    --_pill-bg: var(--lt-color-fill-muted, #f6f8fa);
    --_pill-border: var(--lt-color-border-muted, #e6ebf1);
    --_pill-color: var(--lt-color-text-muted, #59636e);
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: var(--_pill-border-width) solid var(--_pill-border);
    border-radius: var(--_pill-radius);
    padding: var(--_pill-padding-block) var(--_pill-padding-inline);
    background: var(--_pill-bg);
    color: var(--_pill-color);
    font-size: var(--_pill-font-size);
    font-weight: var(--_pill-font-weight);
    line-height: var(--_pill-line-height);
    white-space: nowrap;
    vertical-align: baseline;
  }

  .lt-pill--info {
    --_pill-bg: var(
      --lt-pill-info-bg,
      color-mix(in srgb, var(--lt-color-primary, #1f6feb) 10%, transparent)
    );
    --_pill-border: var(
      --lt-pill-info-border,
      color-mix(in srgb, var(--lt-color-primary, #1f6feb) 22%, transparent)
    );
    --_pill-color: var(--lt-pill-info-color, var(--lt-color-primary, #1f6feb));
  }

  .lt-pill--success {
    --_pill-bg: var(
      --lt-pill-success-bg,
      var(--lt-color-success-surface, #dafbe1)
    );
    --_pill-border: var(
      --lt-pill-success-border,
      var(--lt-color-success-border, #aceebb)
    );
    --_pill-color: var(
      --lt-pill-success-color,
      var(--lt-color-success, #1a7f37)
    );
  }

  .lt-pill--danger {
    --_pill-bg: var(
      --lt-pill-danger-bg,
      var(--lt-color-danger-surface, #ffebe9)
    );
    --_pill-border: var(
      --lt-pill-danger-border,
      var(--lt-color-danger-border, #ffcecb)
    );
    --_pill-color: var(--lt-pill-danger-color, var(--lt-color-danger, #cf222e));
  }
</style>
