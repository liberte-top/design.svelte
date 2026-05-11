<script lang="ts">
  /**
   * Single dt/dd row inside an InfoList. Pass `label` text + slot the value
   * via children (allows code, pills, plain text).
   */
  type Props = {
    label: string;
    children?: import("svelte").Snippet;
  };

  let { label, children }: Props = $props();
</script>

<div class="lt-info-row">
  <dt class="lt-info-row__label">{label}</dt>
  <dd class="lt-info-row__value">{@render children?.()}</dd>
</div>

<style>
  .lt-info-row {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    gap: var(--lt-space-3);
    align-items: baseline;
  }

  .lt-info-row__label {
    margin: 0;
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-xs);
    font-weight: var(--lt-font-weight-strong);
    text-transform: uppercase;
    letter-spacing: var(--lt-tracking-wide);
  }

  .lt-info-row__value {
    margin: 0;
    color: var(--lt-color-text-primary);
    font-size: var(--lt-text-md);
    line-height: var(--lt-leading-snug);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    .lt-info-row {
      grid-template-columns: 1fr;
      gap: var(--lt-space-1);
    }
  }
</style>
