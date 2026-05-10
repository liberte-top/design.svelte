<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type InputSize = "md" | "lg";

  type Props = Omit<HTMLInputAttributes, "size"> & {
    size?: InputSize;
  };

  let {
    size = "md",
    class: className = "",
    type = "text",
    value = $bindable(),
    ...restProps
  }: Props = $props();
</script>

<input
  {...restProps}
  {type}
  bind:value
  class={`lt-input lt-input--${size} ${className}`.trim()}
/>

<style>
  .lt-input {
    box-sizing: border-box;
    width: 100%;
    min-height: var(--lt-control-height);
    padding-inline: var(--lt-space-3);
    border: 1px solid var(--lt-color-border);
    border-radius: var(--lt-radius-md);
    background: var(--lt-color-surface);
    color: var(--lt-color-text-primary);
    font: inherit;
    font-size: var(--lt-text-md);
    line-height: var(--lt-leading-snug);
    transition:
      border-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      box-shadow var(--lt-motion-duration-fast) var(--lt-motion-ease),
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-input::placeholder {
    color: var(--lt-color-text-quaternary);
  }

  .lt-input:hover:not(:disabled) {
    border-color: var(--lt-color-border-strong);
  }

  .lt-input:focus {
    outline: none;
    border-color: var(--lt-color-brand);
    box-shadow: 0 0 0 3px var(--lt-color-focus-ring);
  }

  .lt-input:disabled {
    background: var(--lt-color-surface-muted);
    border-color: var(--lt-color-border);
    color: var(--lt-color-text-disabled);
    cursor: not-allowed;
  }

  .lt-input--lg {
    min-height: var(--lt-control-height-lg);
    padding-inline: var(--lt-space-4);
    font-size: var(--lt-text-base);
  }
</style>
