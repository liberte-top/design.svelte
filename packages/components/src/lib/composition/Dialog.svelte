<script lang="ts">
  import type { Snippet } from "svelte";

  type Size = "sm" | "md" | "lg";

  type Props = {
    open: boolean;
    title?: string;
    description?: string;
    size?: Size;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showClose?: boolean;
    onClose?: () => void;
    eyebrow?: Snippet;
    header?: Snippet;
    children?: Snippet;
    footer?: Snippet;
  };

  let {
    open = $bindable(false),
    title,
    description,
    size = "md",
    closeOnBackdrop = true,
    closeOnEscape = true,
    showClose = true,
    onClose,
    eyebrow,
    header,
    children,
    footer,
  }: Props = $props();

  let dialogEl: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (!dialogEl) return;
    if (open && !dialogEl.open) {
      dialogEl.showModal();
    } else if (!open && dialogEl.open) {
      dialogEl.close();
    }
  });

  function handleClose() {
    open = false;
    onClose?.();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (!closeOnBackdrop) return;
    if (event.target === dialogEl) {
      handleClose();
    }
  }

  function handleCancel(event: Event) {
    if (!closeOnEscape) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    handleClose();
  }
</script>

<dialog
  bind:this={dialogEl}
  class={`lt-dialog lt-dialog--${size}`}
  onclick={handleBackdropClick}
  oncancel={handleCancel}
  onclose={() => {
    if (open) handleClose();
  }}
>
  <div class="lt-dialog__panel" role="document">
    {#if title || header || showClose}
      <header class="lt-dialog__header">
        <div class="lt-dialog__heading">
          {#if eyebrow}
            <div class="lt-dialog__eyebrow">{@render eyebrow()}</div>
          {/if}
          {#if header}
            {@render header()}
          {:else if title}
            <h2 class="lt-dialog__title">{title}</h2>
            {#if description}
              <p class="lt-dialog__description">{description}</p>
            {/if}
          {/if}
        </div>
        {#if showClose}
          <button
            type="button"
            class="lt-dialog__close"
            aria-label="Close"
            onclick={handleClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        {/if}
      </header>
    {/if}

    {#if children}
      <div class="lt-dialog__body">
        {@render children()}
      </div>
    {/if}

    {#if footer}
      <footer class="lt-dialog__footer">
        {@render footer()}
      </footer>
    {/if}
  </div>
</dialog>

<style>
  .lt-dialog {
    /* native <dialog> centers itself when shown with showModal() */
    padding: 0;
    border: none;
    background: transparent;
    color: var(--lt-color-text-primary);
    overflow: visible;
    max-width: min(calc(100vw - var(--lt-space-8)), 560px);
    width: 100%;
  }

  .lt-dialog--sm {
    max-width: min(calc(100vw - var(--lt-space-8)), 400px);
  }
  .lt-dialog--md {
    max-width: min(calc(100vw - var(--lt-space-8)), 560px);
  }
  .lt-dialog--lg {
    max-width: min(calc(100vw - var(--lt-space-8)), 720px);
  }

  .lt-dialog::backdrop {
    background: rgb(8 11 18 / 56%);
    backdrop-filter: blur(2px);
  }

  /* enter/exit transition via modern allow-discrete + @starting-style */
  .lt-dialog,
  .lt-dialog::backdrop {
    transition:
      display var(--lt-motion-duration-base) allow-discrete,
      overlay var(--lt-motion-duration-base) allow-discrete,
      opacity var(--lt-motion-duration-base) var(--lt-motion-ease),
      transform var(--lt-motion-duration-base) var(--lt-motion-ease);
    opacity: 0;
  }

  .lt-dialog {
    transform: scale(0.96) translateY(8px);
  }

  .lt-dialog[open] {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  .lt-dialog[open]::backdrop {
    opacity: 1;
  }

  @starting-style {
    .lt-dialog[open] {
      opacity: 0;
      transform: scale(0.96) translateY(8px);
    }
    .lt-dialog[open]::backdrop {
      opacity: 0;
    }
  }

  .lt-dialog__panel {
    display: flex;
    flex-direction: column;
    background: var(--lt-color-surface);
    border: 1px solid var(--lt-color-border-subtle);
    border-radius: var(--lt-radius-xl);
    box-shadow: var(--lt-shadow-lg);
    overflow: hidden;
    max-height: calc(100vh - var(--lt-space-8));
  }

  .lt-dialog__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--lt-space-4);
    padding: var(--lt-space-6) var(--lt-space-6) var(--lt-space-4)
      var(--lt-space-6);
  }

  .lt-dialog__heading {
    display: flex;
    flex-direction: column;
    gap: var(--lt-space-2);
    min-width: 0;
    flex: 1;
  }

  .lt-dialog__eyebrow {
    font-size: var(--lt-text-xs);
    text-transform: uppercase;
    letter-spacing: var(--lt-tracking-wide);
    color: var(--lt-color-text-tertiary);
    font-weight: var(--lt-font-weight-medium);
  }

  .lt-dialog__title {
    margin: 0;
    font-size: var(--lt-text-xl);
    font-weight: var(--lt-font-weight-strong);
    letter-spacing: var(--lt-tracking-tight);
    line-height: var(--lt-leading-tight);
    color: var(--lt-color-text-primary);
  }

  .lt-dialog__description {
    margin: 0;
    font-size: var(--lt-text-md);
    color: var(--lt-color-text-tertiary);
    line-height: var(--lt-leading-normal);
  }

  .lt-dialog__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border: 1px solid transparent;
    border-radius: var(--lt-radius-md);
    background: transparent;
    color: var(--lt-color-text-tertiary);
    cursor: pointer;
    transition:
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-dialog__close:hover {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
  }

  .lt-dialog__close:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
  }

  .lt-dialog__body {
    padding: 0 var(--lt-space-6) var(--lt-space-6) var(--lt-space-6);
    overflow-y: auto;
    color: var(--lt-color-text-secondary);
    line-height: var(--lt-leading-normal);
  }

  .lt-dialog__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--lt-space-3);
    padding: var(--lt-space-4) var(--lt-space-6);
    background: var(--lt-color-surface-muted);
    border-block-start: 1px solid var(--lt-color-border-subtle);
  }
</style>
