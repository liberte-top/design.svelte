<script lang="ts">
  /**
   * Antd-Pro-style application shell: fixed top Header + collapsible left
   * Sider + scrollable main Content. Use this for admin / reference / data-
   * dense surfaces where users navigate between many sub-pages and need a
   * persistent menu — distinct from AppShell, which is the simple
   * Stage > Frame > Stack arrangement for single-page flows (login, smoke
   * dashboard, registry tokens).
   *
   * The Sider collapses below the breakpoint into a header-toggleable
   * drawer; on desktop it stays visible. All three regions are theme-aware
   * via tokens; the consumer slots whatever atoms / nav items make sense.
   */
  type SiderWidth = "sm" | "md" | "lg";

  type Props = {
    siderWidth?: SiderWidth;
    sider?: import("svelte").Snippet;
    header?: import("svelte").Snippet;
    headerActions?: import("svelte").Snippet;
    breadcrumb?: import("svelte").Snippet;
    footer?: import("svelte").Snippet;
    children?: import("svelte").Snippet;
  };

  let {
    siderWidth = "md",
    sider,
    header,
    headerActions,
    breadcrumb,
    footer,
    children,
  }: Props = $props();

  let siderOpen = $state(false);

  function closeSider() {
    siderOpen = false;
  }
</script>

<div class={`lt-prolayout lt-prolayout--sider-${siderWidth}`}>
  {#if header}
    <header class="lt-prolayout__header">
      <div class="lt-prolayout__header-inner">
        {#if sider}
          <button
            type="button"
            class="lt-prolayout__sider-toggle"
            aria-label="Toggle navigation"
            aria-expanded={siderOpen}
            onclick={() => (siderOpen = !siderOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              {#if siderOpen}
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              {:else}
                <path d="M4 12h16" />
                <path d="M4 6h16" />
                <path d="M4 18h16" />
              {/if}
            </svg>
          </button>
        {/if}
        <div class="lt-prolayout__brand">{@render header()}</div>
        {#if headerActions}
          <div class="lt-prolayout__header-actions">
            {@render headerActions()}
          </div>
        {/if}
      </div>
    </header>
  {/if}

  <div class="lt-prolayout__body">
    {#if sider}
      <aside
        class={`lt-prolayout__sider ${siderOpen ? "lt-prolayout__sider--open" : ""}`.trim()}
        aria-label="Primary navigation"
      >
        <div
          class="lt-prolayout__sider-inner"
          role="presentation"
          onclick={closeSider}
          onkeydown={(e) => {
            if (e.key === "Escape") closeSider();
          }}
        >
          {@render sider()}
        </div>
      </aside>
      {#if siderOpen}
        <button
          type="button"
          class="lt-prolayout__scrim"
          aria-label="Close navigation"
          onclick={closeSider}
        ></button>
      {/if}
    {/if}

    <main class="lt-prolayout__main">
      {#if breadcrumb}
        <div class="lt-prolayout__breadcrumb">{@render breadcrumb()}</div>
      {/if}
      <div class="lt-prolayout__content">{@render children?.()}</div>
      {#if footer}
        <footer class="lt-prolayout__footer">{@render footer()}</footer>
      {/if}
    </main>
  </div>
</div>

<style>
  .lt-prolayout {
    --_sider-width: 240px;
    --_header-height: 56px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--lt-color-bg);
    color: var(--lt-color-text-primary);
  }

  .lt-prolayout--sider-sm {
    --_sider-width: 200px;
  }
  .lt-prolayout--sider-md {
    --_sider-width: 240px;
  }
  .lt-prolayout--sider-lg {
    --_sider-width: 280px;
  }

  .lt-prolayout__header {
    position: sticky;
    top: 0;
    z-index: 20;
    height: var(--_header-height);
    background: var(--lt-color-surface);
    border-bottom: 1px solid var(--lt-color-border-subtle);
    backdrop-filter: saturate(140%) blur(8px);
  }

  .lt-prolayout__header-inner {
    height: 100%;
    padding-inline: var(--lt-space-4);
    display: flex;
    align-items: center;
    gap: var(--lt-space-4);
  }

  .lt-prolayout__sider-toggle {
    display: none;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--lt-color-border);
    border-radius: var(--lt-radius-md);
    color: var(--lt-color-text-secondary);
    cursor: pointer;
    transition: background-color var(--lt-motion-duration-fast)
      var(--lt-motion-ease);
  }

  .lt-prolayout__sider-toggle:hover {
    background: var(--lt-color-surface-hover);
    color: var(--lt-color-text-primary);
  }

  .lt-prolayout__brand {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--lt-space-3);
  }

  .lt-prolayout__header-actions {
    display: flex;
    align-items: center;
    gap: var(--lt-space-2);
  }

  .lt-prolayout__body {
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: var(--_sider-width) minmax(0, 1fr);
    align-items: stretch;
    min-height: 0;
  }

  .lt-prolayout__sider {
    position: sticky;
    top: var(--_header-height);
    align-self: start;
    height: calc(100vh - var(--_header-height));
    background: var(--lt-color-surface);
    border-right: 1px solid var(--lt-color-border-subtle);
    overflow-y: auto;
  }

  .lt-prolayout__sider-inner {
    padding: var(--lt-space-4) var(--lt-space-3);
  }

  .lt-prolayout__scrim {
    display: none;
  }

  .lt-prolayout__main {
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: var(--lt-color-bg);
  }

  .lt-prolayout__breadcrumb {
    padding: var(--lt-space-4) var(--lt-space-6) 0;
  }

  .lt-prolayout__content {
    flex: 1 1 auto;
    padding: var(--lt-space-4) var(--lt-space-6) var(--lt-space-8);
    display: flex;
    flex-direction: column;
    gap: var(--lt-space-4);
  }

  .lt-prolayout__footer {
    padding: var(--lt-space-4) var(--lt-space-6);
    border-top: 1px solid var(--lt-color-border-subtle);
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-sm);
  }

  @media (max-width: 768px) {
    .lt-prolayout__body {
      grid-template-columns: minmax(0, 1fr);
    }

    .lt-prolayout__sider-toggle {
      display: inline-flex;
    }

    .lt-prolayout__sider {
      position: fixed;
      top: var(--_header-height);
      bottom: 0;
      left: 0;
      width: var(--_sider-width);
      max-width: 80vw;
      transform: translateX(-100%);
      transition: transform var(--lt-motion-duration-base) var(--lt-motion-ease);
      box-shadow: var(--lt-shadow-lg);
      z-index: 30;
      height: auto;
    }

    .lt-prolayout__sider--open {
      transform: translateX(0);
    }

    .lt-prolayout__scrim {
      display: block;
      position: fixed;
      top: var(--_header-height);
      inset-inline: 0;
      bottom: 0;
      background: rgb(0 0 0 / 35%);
      border: 0;
      padding: 0;
      cursor: pointer;
      z-index: 25;
    }

    .lt-prolayout__content,
    .lt-prolayout__breadcrumb,
    .lt-prolayout__footer {
      padding-inline: var(--lt-space-4);
    }
  }
</style>
