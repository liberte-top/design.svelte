<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type Props = HTMLAttributes<HTMLDivElement> & {
    label?: string;
    required?: boolean;
    optional?: string;
    hint?: string;
    error?: string;
    children?: import("svelte").Snippet;
    labelContent?: import("svelte").Snippet;
    hintContent?: import("svelte").Snippet;
    errorContent?: import("svelte").Snippet;
  };

  let {
    label,
    required = false,
    optional,
    hint,
    error,
    children,
    labelContent,
    hintContent,
    errorContent,
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<div {...rest} class={`lt-field ${className}`.trim()}>
  {#if label || labelContent}
    <div class="lt-field__label-row">
      <div class="lt-field__label">
        {#if labelContent}
          {@render labelContent()}
        {:else}
          <span>{label}</span>
        {/if}
        {#if required}
          <span class="lt-field__required" aria-hidden="true">*</span>
        {/if}
      </div>
      {#if optional}
        <span class="lt-field__optional">{optional}</span>
      {/if}
    </div>
  {/if}

  <div class="lt-field__control">
    {@render children?.()}
  </div>

  {#if error || errorContent}
    <div class="lt-field__message lt-field__message--error">
      {#if errorContent}
        {@render errorContent()}
      {:else}
        <span>{error}</span>
      {/if}
    </div>
  {:else if hint || hintContent}
    <div class="lt-field__message lt-field__message--hint">
      {#if hintContent}
        {@render hintContent()}
      {:else}
        <span>{hint}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .lt-field {
    display: grid;
    gap: var(--lt-space-2);
    min-width: 0;
  }

  .lt-field__label-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--lt-space-3);
  }

  .lt-field__label {
    display: inline-flex;
    align-items: baseline;
    gap: var(--lt-space-1);
    min-width: 0;
    color: var(--lt-color-text-primary);
    font-size: var(--lt-text-md);
    font-weight: var(--lt-font-weight-strong);
    line-height: var(--lt-leading-snug);
  }

  .lt-field__optional {
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-sm);
    line-height: var(--lt-leading-snug);
    white-space: nowrap;
  }

  .lt-field__required {
    color: var(--lt-color-text-danger);
  }

  .lt-field__control {
    min-width: 0;
  }

  .lt-field__message {
    font-size: var(--lt-text-sm);
    line-height: var(--lt-leading-snug);
  }

  .lt-field__message--hint {
    color: var(--lt-color-text-tertiary);
  }

  .lt-field__message--error {
    color: var(--lt-color-text-danger);
  }
</style>
