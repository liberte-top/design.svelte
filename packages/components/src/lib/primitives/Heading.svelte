<script lang="ts">
  type Level = 1 | 2 | 3 | 4 | 5 | 6;
  type Size = "sm" | "md" | "lg" | "xl" | "display";
  type Tone = "default" | "muted";

  type Props = {
    level?: Level;
    size?: Size;
    tone?: Tone;
    children?: import("svelte").Snippet;
  };

  let { level = 2, size = "md", tone = "default", children }: Props = $props();

  const tag = $derived(`h${level}` as const);
  const cls = $derived(`lt-heading lt-heading--${size} lt-heading--${tone}`);
</script>

<svelte:element this={tag} class={cls}>
  {@render children?.()}
</svelte:element>

<style>
  .lt-heading {
    margin: 0;
    color: var(--lt-color-text-primary);
    font-family: var(--lt-font-family-display);
    font-weight: var(--lt-font-weight-strong);
    line-height: var(--lt-leading-tight);
    letter-spacing: var(--lt-tracking-tight);
  }

  .lt-heading--sm {
    font-size: var(--lt-text-base);
  }
  .lt-heading--md {
    font-size: var(--lt-text-xl);
  }
  .lt-heading--lg {
    font-size: var(--lt-text-2xl);
  }
  .lt-heading--xl {
    font-size: var(--lt-text-3xl);
  }
  .lt-heading--display {
    font-size: var(--lt-text-display);
  }

  .lt-heading--default {
    color: var(--lt-color-text-primary);
  }
  .lt-heading--muted {
    color: var(--lt-color-text-secondary);
  }
</style>
