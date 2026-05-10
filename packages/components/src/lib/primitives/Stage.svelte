<script lang="ts">
  type Padding = "sm" | "md" | "lg" | "xl";
  type Align = "start" | "center";

  type Props = {
    padding?: Padding;
    align?: Align;
    children?: import("svelte").Snippet;
  };

  let { padding = "lg", align = "start", children }: Props = $props();
</script>

<main class={`lt-stage lt-stage--p-${padding} lt-stage--a-${align}`}>
  {@render children?.()}
</main>

<style>
  .lt-stage {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background: var(--lt-color-bg);
  }

  .lt-stage--p-sm {
    padding: var(--lt-space-4) var(--lt-space-3);
  }
  .lt-stage--p-md {
    padding: var(--lt-space-6) var(--lt-space-4);
  }
  .lt-stage--p-lg {
    padding: var(--lt-space-10) var(--lt-space-4);
  }
  .lt-stage--p-xl {
    padding: var(--lt-space-16) var(--lt-space-6);
  }

  .lt-stage--a-start {
    align-items: flex-start;
  }
  .lt-stage--a-center {
    align-items: center;
  }
</style>
