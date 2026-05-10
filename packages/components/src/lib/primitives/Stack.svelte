<script lang="ts">
  type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
  type Align = "start" | "stretch" | "center" | "end";

  type Props = {
    gap?: Gap;
    align?: Align;
    /** Make the stack fill its parent's cross-axis (height in row-flex contexts). */
    grow?: boolean;
    children?: import("svelte").Snippet;
  };

  let {
    gap = "md",
    align = "stretch",
    grow = false,
    children,
  }: Props = $props();
</script>

<div
  class={`lt-stack lt-stack--gap-${gap} lt-stack--a-${align} ${grow ? "lt-stack--grow" : ""}`.trim()}
>
  {@render children?.()}
</div>

<style>
  .lt-stack {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .lt-stack--grow {
    flex: 1 1 auto;
    min-block-size: 0;
  }

  .lt-stack--gap-none {
    gap: 0;
  }
  .lt-stack--gap-xs {
    gap: var(--lt-space-1);
  }
  .lt-stack--gap-sm {
    gap: var(--lt-space-2);
  }
  .lt-stack--gap-md {
    gap: var(--lt-space-4);
  }
  .lt-stack--gap-lg {
    gap: var(--lt-space-6);
  }
  .lt-stack--gap-xl {
    gap: var(--lt-space-8);
  }

  .lt-stack--a-start {
    align-items: flex-start;
  }
  .lt-stack--a-stretch {
    align-items: stretch;
  }
  .lt-stack--a-center {
    align-items: center;
  }
  .lt-stack--a-end {
    align-items: flex-end;
  }
</style>
