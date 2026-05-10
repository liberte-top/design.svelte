<script lang="ts">
  type Props = {
    children?: import("svelte").Snippet;
  };

  let { children }: Props = $props();
</script>

<div class="lt-card-header">
  {@render children?.()}
</div>

<style>
  .lt-card-header {
    display: grid;
    gap: var(--lt-space-1);
    margin-block-end: var(--lt-space-5);
  }

  /* Heading + Text + SectionLabel slot in directly; no extra typography rules
   * here — that's the typography primitives' job. We only correct the
   * default browser margins (which the global reset already does) and
   * provide rhythm via the gap above. */
</style>
