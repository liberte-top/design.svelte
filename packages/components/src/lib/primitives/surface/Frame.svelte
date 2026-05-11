<script lang="ts">
  /**
   * Page-level width frame: a single column with max-inline-size, used as the
   * direct child of <Stage> to set how wide content can flow before it stops
   * growing. Consumers pass the size via prop ("sm"/"md"/"lg"/"xl"/"full").
   */
  type Width = "xs" | "sm" | "md" | "lg" | "xl" | "full";

  type Props = {
    width?: Width;
    children?: import("svelte").Snippet;
  };

  let { width = "md", children }: Props = $props();
</script>

<div class={`lt-frame lt-frame--${width}`}>
  {@render children?.()}
</div>

<style>
  .lt-frame {
    width: 100%;
    margin-inline: auto;
  }

  .lt-frame--xs {
    max-inline-size: 360px;
  }
  .lt-frame--sm {
    max-inline-size: 480px;
  }
  .lt-frame--md {
    max-inline-size: 640px;
  }
  .lt-frame--lg {
    max-inline-size: 880px;
  }
  .lt-frame--xl {
    max-inline-size: 1120px;
  }
  .lt-frame--full {
    max-inline-size: none;
  }
</style>
