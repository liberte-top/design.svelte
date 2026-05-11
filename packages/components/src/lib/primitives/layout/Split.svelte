<script lang="ts">
  /**
   * Equal-share two-pane (or N-pane) row that collapses to a single column
   * below the breakpoint. Each direct child becomes a track of the grid.
   */
  type Gap = "none" | "sm" | "md" | "lg";
  /** Min width per column before collapse. */
  type Min = "sm" | "md" | "lg";

  type Props = {
    gap?: Gap;
    min?: Min;
    children?: import("svelte").Snippet;
  };

  let { gap = "md", min = "md", children }: Props = $props();
</script>

<div class={`lt-split lt-split--gap-${gap} lt-split--min-${min}`}>
  {@render children?.()}
</div>

<style>
  .lt-split {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(var(--_split-min, 240px), 100%), 1fr)
    );
  }

  .lt-split--gap-none {
    gap: 0;
  }
  .lt-split--gap-sm {
    gap: var(--lt-space-3);
  }
  .lt-split--gap-md {
    gap: var(--lt-space-4);
  }
  .lt-split--gap-lg {
    gap: var(--lt-space-6);
  }

  .lt-split--min-sm {
    --_split-min: 200px;
  }
  .lt-split--min-md {
    --_split-min: 280px;
  }
  .lt-split--min-lg {
    --_split-min: 360px;
  }
</style>
