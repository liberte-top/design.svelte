<script lang="ts">
  type Props = {
    children?: import("svelte").Snippet;
  };

  let { children }: Props = $props();
</script>

<p class="lt-section-label">
  {@render children?.()}
</p>

<style>
  .lt-section-label {
    margin: 0;
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-xs);
    font-weight: var(--lt-font-weight-strong);
    line-height: 1.5;
    text-transform: uppercase;
    letter-spacing: var(--lt-tracking-wide);
  }
</style>
