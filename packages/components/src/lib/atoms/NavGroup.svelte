<script lang="ts">
  /**
   * A labelled cluster of NavItem entries inside a Sider. The label sits
   * above its items in the SectionLabel typography (uppercase, tracked,
   * tertiary tone) so multiple groups read as visually distinct sections
   * of the same navigation pane.
   */
  type Props = {
    label: string;
    children?: import("svelte").Snippet;
  };

  let { label, children }: Props = $props();
</script>

<div class="lt-navgroup">
  <p class="lt-navgroup__label">{label}</p>
  <div class="lt-navgroup__items">{@render children?.()}</div>
</div>

<style>
  .lt-navgroup {
    display: flex;
    flex-direction: column;
    gap: var(--lt-space-1);
    margin-block-end: var(--lt-space-4);
  }

  .lt-navgroup__label {
    margin: 0;
    padding: var(--lt-space-2) var(--lt-space-3) var(--lt-space-1);
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-xs);
    font-weight: var(--lt-font-weight-strong);
    letter-spacing: var(--lt-tracking-wide);
    text-transform: uppercase;
  }

  .lt-navgroup__items {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
