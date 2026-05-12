<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Size = "sm" | "md" | "lg";

  type Props = HTMLAttributes<HTMLDivElement> & {
    title: string;
    description?: string;
    size?: Size;
    icon?: Snippet;
    actions?: Snippet;
    children?: Snippet;
  };

  let {
    title,
    description,
    size = "md",
    icon,
    actions,
    children,
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<div
  {...rest}
  class={`lt-empty-state lt-empty-state--${size} ${className}`.trim()}
>
  {#if icon}
    <div class="lt-empty-state__icon">
      {@render icon()}
    </div>
  {/if}

  <div class="lt-empty-state__copy">
    <h3 class="lt-empty-state__title">{title}</h3>
    {#if description}
      <p class="lt-empty-state__description">{description}</p>
    {/if}
    {#if children}
      <div class="lt-empty-state__body">
        {@render children()}
      </div>
    {/if}
  </div>

  {#if actions}
    <div class="lt-empty-state__actions">
      {@render actions()}
    </div>
  {/if}
</div>

<style>
  .lt-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--lt-space-4);
    color: var(--lt-color-text-secondary);
  }

  .lt-empty-state--sm {
    padding-block: var(--lt-space-8);
  }
  .lt-empty-state--md {
    padding-block: var(--lt-space-12);
  }
  .lt-empty-state--lg {
    padding-block: var(--lt-space-16);
  }

  .lt-empty-state__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: var(--lt-radius-lg);
    background: var(--lt-color-surface-muted);
    border: 1px solid var(--lt-color-border-subtle);
    color: var(--lt-color-text-tertiary);
  }

  .lt-empty-state--lg .lt-empty-state__icon {
    width: 72px;
    height: 72px;
  }

  .lt-empty-state__copy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--lt-space-2);
    max-width: 40ch;
  }

  .lt-empty-state__title {
    margin: 0;
    color: var(--lt-color-text-primary);
    font-size: var(--lt-text-lg);
    font-weight: var(--lt-font-weight-strong);
    letter-spacing: var(--lt-tracking-tight);
    line-height: var(--lt-leading-snug);
  }

  .lt-empty-state--lg .lt-empty-state__title {
    font-size: var(--lt-text-xl);
  }

  .lt-empty-state__description {
    margin: 0;
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-md);
    line-height: var(--lt-leading-normal);
  }

  .lt-empty-state__body {
    margin-block-start: var(--lt-space-2);
  }

  .lt-empty-state__actions {
    display: inline-flex;
    align-items: center;
    gap: var(--lt-space-3);
    margin-block-start: var(--lt-space-2);
  }
</style>
