<script lang="ts">
  import Stage from "../primitives/surface/Stage.svelte";
  import Frame from "../primitives/surface/Frame.svelte";
  import Stack from "../primitives/layout/Stack.svelte";
  import Inline from "../primitives/layout/Inline.svelte";

  /**
   * Canonical page shell: Stage > Frame > Stack with a header band, a main
   * area, and an optional footer. Webs slot content into `header`, `main`
   * (children), and `footer`. Reduces the boilerplate every web duplicates
   * (Stage padding + Frame width + the header inline row).
   */
  type Width = "xs" | "sm" | "md" | "lg" | "xl" | "full";
  type Padding = "sm" | "md" | "lg" | "xl";
  type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

  type Props = {
    width?: Width;
    padding?: Padding;
    gap?: Gap;
    children?: import("svelte").Snippet;
    header?: import("svelte").Snippet;
    footer?: import("svelte").Snippet;
    aside?: import("svelte").Snippet;
  };

  let {
    width = "md",
    padding = "lg",
    gap = "md",
    children,
    header,
    footer,
    aside,
  }: Props = $props();
</script>

<Stage {padding} align="start">
  <Frame {width}>
    <Stack {gap}>
      {#if header || aside}
        <Inline justify="between" align="center" gap="md">
          {#if header}
            <div class="lt-app-shell__brand">
              {@render header()}
            </div>
          {:else}
            <span></span>
          {/if}
          {#if aside}
            <Inline gap="sm" align="center" wrap>
              {@render aside()}
            </Inline>
          {/if}
        </Inline>
      {/if}

      <div class="lt-app-shell__main">
        {@render children?.()}
      </div>

      {#if footer}
        <div class="lt-app-shell__footer">
          {@render footer()}
        </div>
      {/if}
    </Stack>
  </Frame>
</Stage>

<style>
  .lt-app-shell__main {
    display: contents;
  }

  .lt-app-shell__brand {
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  .lt-app-shell__footer {
    margin-block-start: var(--lt-space-4);
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-sm);
  }
</style>
