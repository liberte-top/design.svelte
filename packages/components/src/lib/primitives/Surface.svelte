<script lang="ts">
  type Tone = "default" | "muted" | "sunken" | "accent-soft";
  type Padding = "none" | "sm" | "md" | "lg";
  type Radius = "none" | "sm" | "md" | "lg";
  type Border = "none" | "subtle" | "default";

  type Props = {
    tone?: Tone;
    padding?: Padding;
    radius?: Radius;
    border?: Border;
    children?: import("svelte").Snippet;
  };

  let {
    tone = "default",
    padding = "md",
    radius = "md",
    border = "subtle",
    children,
  }: Props = $props();
</script>

<div
  class={`lt-surface lt-surface--t-${tone} lt-surface--p-${padding} lt-surface--r-${radius} lt-surface--b-${border}`}
>
  {@render children?.()}
</div>

<style>
  .lt-surface {
    min-width: 0;
  }

  .lt-surface--t-default {
    background: var(--lt-color-surface);
  }
  .lt-surface--t-muted {
    background: var(--lt-color-surface-muted);
  }
  .lt-surface--t-sunken {
    background: var(--lt-color-surface-sunken);
  }
  .lt-surface--t-accent-soft {
    background: var(--lt-color-surface-accent-soft);
  }

  .lt-surface--p-none {
    padding: 0;
  }
  .lt-surface--p-sm {
    padding: var(--lt-space-3);
  }
  .lt-surface--p-md {
    padding: var(--lt-space-4);
  }
  .lt-surface--p-lg {
    padding: var(--lt-space-6);
  }

  .lt-surface--r-none {
    border-radius: 0;
  }
  .lt-surface--r-sm {
    border-radius: var(--lt-radius-sm);
  }
  .lt-surface--r-md {
    border-radius: var(--lt-radius-md);
  }
  .lt-surface--r-lg {
    border-radius: var(--lt-radius-lg);
  }

  .lt-surface--b-none {
    border: 0;
  }
  .lt-surface--b-subtle {
    border: 1px solid var(--lt-color-border-subtle);
  }
  .lt-surface--b-default {
    border: 1px solid var(--lt-color-border);
  }
</style>
