<script lang="ts">
  /** Block code container. Pass raw text via the `text` prop OR children. */
  type Props = {
    text?: string;
    children?: import("svelte").Snippet;
  };

  let { text, children }: Props = $props();
</script>

<pre class="lt-pre">{#if text}{text}{:else}{@render children?.()}{/if}</pre>

<style>
  .lt-pre {
    margin: 0;
    padding: var(--lt-space-3) var(--lt-space-4);
    overflow: auto;
    border: 1px solid var(--lt-color-border-subtle);
    border-radius: var(--lt-radius-md);
    background: var(--lt-color-surface-muted);
    color: var(--lt-color-text-primary);
    font-family: var(--lt-font-family-mono);
    font-size: var(--lt-text-sm);
    line-height: var(--lt-leading-snug);
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
