<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type Padding = "sm" | "md" | "lg";

  type Props = HTMLAttributes<HTMLElement> & {
    padding?: Padding;
    children?: import("svelte").Snippet;
    header?: import("svelte").Snippet;
    footer?: import("svelte").Snippet;
  };

  let {
    padding = "md",
    children,
    header,
    footer,
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<section {...rest} class={`lt-card lt-card--p-${padding} ${className}`.trim()}>
  {#if header}
    <div class="lt-card__header">
      {@render header()}
    </div>
  {/if}

  <div class="lt-card__body">
    {@render children?.()}
  </div>

  {#if footer}
    <div class="lt-card__footer">
      {@render footer()}
    </div>
  {/if}
</section>

<style>
  .lt-card {
    display: grid;
    background: var(--lt-color-surface);
    color: var(--lt-color-text-primary);
    border-radius: var(--lt-radius-lg);
    box-shadow: var(--lt-shadow-card);
    transition: box-shadow var(--lt-motion-duration-base) var(--lt-motion-ease);
  }

  .lt-card--p-sm {
    padding: var(--lt-space-4);
    gap: var(--lt-space-3);
  }
  .lt-card--p-md {
    padding: var(--lt-space-6);
    gap: var(--lt-space-4);
  }
  .lt-card--p-lg {
    padding: var(--lt-space-8);
    gap: var(--lt-space-6);
  }

  .lt-card__header:empty,
  .lt-card__body:empty,
  .lt-card__footer:empty {
    display: none;
  }

  .lt-card__header {
    padding-block-end: var(--lt-space-4);
    border-block-end: 1px solid var(--lt-color-border-subtle);
  }

  .lt-card__body {
    min-width: 0;
  }

  .lt-card__footer {
    padding-block-start: var(--lt-space-4);
    border-block-start: 1px solid var(--lt-color-border-subtle);
  }
</style>
