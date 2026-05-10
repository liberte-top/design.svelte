<script lang="ts">
  /**
   * Wrapping inline group, optimized for chip / tag / pill rows. Differs
   * from <Inline wrap> in that the default gap is small and align is baseline,
   * matching Pill / Code visual stems.
   */
  type Gap = "xs" | "sm" | "md";

  type Props = {
    gap?: Gap;
    children?: import("svelte").Snippet;
  };

  let { gap = "sm", children }: Props = $props();
</script>

<div class={`lt-cluster lt-cluster--gap-${gap}`}>
  {@render children?.()}
</div>

<style>
  .lt-cluster {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .lt-cluster--gap-xs {
    gap: var(--lt-space-1);
  }
  .lt-cluster--gap-sm {
    gap: var(--lt-space-2);
  }
  .lt-cluster--gap-md {
    gap: var(--lt-space-3);
  }
</style>
