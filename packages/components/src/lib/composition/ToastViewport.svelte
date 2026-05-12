<script lang="ts">
  import { fly } from "svelte/transition";
  import { toasts, dismiss, type ToastTone } from "../stores/toast.js";

  type Position =
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom-center"
    | "top-center";

  type Props = {
    position?: Position;
    max?: number;
  };

  let { position = "bottom-right", max = 4 }: Props = $props();

  const visible = $derived($toasts.slice(-max));

  const flyFrom = $derived.by(() => {
    if (position.startsWith("top")) return { y: -24, x: 0 };
    if (position.endsWith("right")) return { y: 0, x: 24 };
    if (position.endsWith("left")) return { y: 0, x: -24 };
    return { y: 24, x: 0 };
  });

  function toneIcon(tone: ToastTone) {
    return tone;
  }
</script>

<div
  class={`lt-toast-viewport lt-toast-viewport--${position}`}
  role="region"
  aria-live="polite"
  aria-label="Notifications"
>
  {#each visible as t (t.id)}
    <div
      class={`lt-toast lt-toast--${t.tone}`}
      role="status"
      in:fly={{ duration: 200, x: flyFrom.x, y: flyFrom.y }}
      out:fly={{ duration: 160, x: flyFrom.x, y: flyFrom.y }}
    >
      <div
        class={`lt-toast__indicator lt-toast__indicator--${toneIcon(t.tone)}`}
        aria-hidden="true"
      ></div>
      <div class="lt-toast__copy">
        <div class="lt-toast__title">{t.title}</div>
        {#if t.body}
          <div class="lt-toast__body">{t.body}</div>
        {/if}
      </div>
      <button
        type="button"
        class="lt-toast__dismiss"
        aria-label="Dismiss"
        onclick={() => dismiss(t.id)}
      >
        <svg
          width="14"
          height="14"
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
    </div>
  {/each}
</div>

<style>
  .lt-toast-viewport {
    position: fixed;
    z-index: 2147483640;
    display: flex;
    flex-direction: column;
    gap: var(--lt-space-2);
    padding: var(--lt-space-4);
    pointer-events: none;
    max-width: min(calc(100vw - var(--lt-space-4)), 360px);
  }

  .lt-toast-viewport--bottom-right {
    right: 0;
    bottom: 0;
    align-items: flex-end;
  }
  .lt-toast-viewport--bottom-left {
    left: 0;
    bottom: 0;
    align-items: flex-start;
  }
  .lt-toast-viewport--top-right {
    right: 0;
    top: 0;
    align-items: flex-end;
  }
  .lt-toast-viewport--top-left {
    left: 0;
    top: 0;
    align-items: flex-start;
  }
  .lt-toast-viewport--bottom-center {
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    align-items: center;
  }
  .lt-toast-viewport--top-center {
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    align-items: center;
  }

  .lt-toast {
    pointer-events: auto;
    display: flex;
    align-items: flex-start;
    gap: var(--lt-space-3);
    width: 100%;
    padding: var(--lt-space-3) var(--lt-space-4);
    background: var(--lt-color-surface);
    border: 1px solid var(--lt-color-border-subtle);
    border-radius: var(--lt-radius-lg);
    box-shadow: var(--lt-shadow-lg);
    color: var(--lt-color-text-primary);
  }

  .lt-toast__indicator {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    margin-block-start: 6px;
    border-radius: var(--lt-radius-pill);
  }
  .lt-toast__indicator--success {
    background: var(--lt-color-text-success);
  }
  .lt-toast__indicator--danger {
    background: var(--lt-color-text-danger);
  }
  .lt-toast__indicator--warning {
    background: var(--lt-color-text-warning);
  }
  .lt-toast__indicator--info {
    background: var(--lt-color-brand);
  }

  .lt-toast__copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lt-toast__title {
    color: var(--lt-color-text-primary);
    font-size: var(--lt-text-md);
    font-weight: var(--lt-font-weight-strong);
    line-height: var(--lt-leading-snug);
  }

  .lt-toast__body {
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-sm);
    line-height: var(--lt-leading-snug);
  }

  .lt-toast__dismiss {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: var(--lt-color-text-tertiary);
    border-radius: var(--lt-radius-sm);
    cursor: pointer;
    margin-block-start: 2px;
    transition:
      background-color var(--lt-motion-duration-fast) var(--lt-motion-ease),
      color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-toast__dismiss:hover {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
  }

  .lt-toast__dismiss:focus-visible {
    outline: 3px solid var(--lt-color-focus-ring);
    outline-offset: 2px;
  }
</style>
