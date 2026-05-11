<script lang="ts">
  /** Inline code chip. For multiline payloads use <Pre>. */
  type Props = {
    children?: import("svelte").Snippet;
  };

  let { children }: Props = $props();
</script>

<code class="lt-code">{@render children?.()}</code>

<style>
  .lt-code {
    display: inline;
    padding: 1px 6px;
    border-radius: var(--lt-radius-xs);
    background: var(--lt-color-surface-muted);
    color: var(--lt-color-text-primary);
    font-family: var(--lt-font-family-mono);
    font-size: 0.92em;
    line-height: inherit;
  }
</style>
