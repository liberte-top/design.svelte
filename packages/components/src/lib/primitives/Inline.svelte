<script lang="ts">
  type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
  type Align = "start" | "center" | "end" | "stretch" | "baseline";
  type Justify = "start" | "center" | "end" | "between" | "around";

  type Props = {
    gap?: Gap;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    children?: import("svelte").Snippet;
  };

  let {
    gap = "md",
    align = "center",
    justify = "start",
    wrap = false,
    children,
  }: Props = $props();
</script>

<div
  class={`lt-inline lt-inline--gap-${gap} lt-inline--a-${align} lt-inline--j-${justify} ${wrap ? "lt-inline--wrap" : ""}`.trim()}
>
  {@render children?.()}
</div>

<style>
  .lt-inline {
    display: flex;
    flex-direction: row;
    min-width: 0;
  }

  .lt-inline--wrap {
    flex-wrap: wrap;
  }

  .lt-inline--gap-none {
    gap: 0;
  }
  .lt-inline--gap-xs {
    gap: var(--lt-space-1);
  }
  .lt-inline--gap-sm {
    gap: var(--lt-space-2);
  }
  .lt-inline--gap-md {
    gap: var(--lt-space-3);
  }
  .lt-inline--gap-lg {
    gap: var(--lt-space-4);
  }
  .lt-inline--gap-xl {
    gap: var(--lt-space-6);
  }

  .lt-inline--a-start {
    align-items: flex-start;
  }
  .lt-inline--a-center {
    align-items: center;
  }
  .lt-inline--a-end {
    align-items: flex-end;
  }
  .lt-inline--a-stretch {
    align-items: stretch;
  }
  .lt-inline--a-baseline {
    align-items: baseline;
  }

  .lt-inline--j-start {
    justify-content: flex-start;
  }
  .lt-inline--j-center {
    justify-content: center;
  }
  .lt-inline--j-end {
    justify-content: flex-end;
  }
  .lt-inline--j-between {
    justify-content: space-between;
  }
  .lt-inline--j-around {
    justify-content: space-around;
  }
</style>
