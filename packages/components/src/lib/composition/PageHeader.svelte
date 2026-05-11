<script lang="ts">
  import Stack from "../primitives/layout/Stack.svelte";
  import Inline from "../primitives/layout/Inline.svelte";
  import Heading from "../primitives/text/Heading.svelte";
  import Text from "../primitives/text/Text.svelte";
  import SectionLabel from "../atoms/SectionLabel.svelte";

  /**
   * Title block at the top of a page or a Card body. Accepts the canonical
   * SectionLabel + Heading + Text triplet plus an optional `actions` slot
   * that renders to the right (collapses below summary on narrow screens).
   */
  type Level = 1 | 2 | 3 | 4 | 5 | 6;
  type Size = "sm" | "md" | "lg" | "xl" | "display";

  type Props = {
    eyebrow?: string;
    title: string;
    summary?: string;
    level?: Level;
    size?: Size;
    children?: import("svelte").Snippet;
    actions?: import("svelte").Snippet;
  };

  let {
    eyebrow,
    title,
    summary,
    level = 1,
    size = "lg",
    children,
    actions,
  }: Props = $props();
</script>

<div class="lt-page-header">
  {#if actions}
    <Inline gap="md" align="start" justify="between" wrap>
      <Stack gap="xs">
        {#if eyebrow}<SectionLabel>{eyebrow}</SectionLabel>{/if}
        <Heading {level} {size}>{title}</Heading>
        {#if summary}<Text tone="secondary">{summary}</Text>{/if}
        {#if children}{@render children()}{/if}
      </Stack>
      <Inline gap="sm" align="center" wrap>
        {@render actions()}
      </Inline>
    </Inline>
  {:else}
    <Stack gap="xs">
      {#if eyebrow}<SectionLabel>{eyebrow}</SectionLabel>{/if}
      <Heading {level} {size}>{title}</Heading>
      {#if summary}<Text tone="secondary">{summary}</Text>{/if}
      {#if children}{@render children()}{/if}
    </Stack>
  {/if}
</div>

<style>
  .lt-page-header {
    min-width: 0;
  }
</style>
