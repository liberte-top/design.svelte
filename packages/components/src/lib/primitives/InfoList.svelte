<script lang="ts">
  /** Wrapper for one or more <InfoRow> children, providing rhythm. */
  type Gap = "sm" | "md";

  type Props = {
    gap?: Gap;
    children?: import("svelte").Snippet;
  };

  let { gap = "md", children }: Props = $props();
</script>

<dl class={`lt-info-list lt-info-list--gap-${gap}`}>
  {@render children?.()}
</dl>

<style>
  .lt-info-list {
    display: grid;
    margin: 0;
  }

  .lt-info-list--gap-sm {
    gap: var(--lt-space-2);
  }
  .lt-info-list--gap-md {
    gap: var(--lt-space-3);
  }
</style>
