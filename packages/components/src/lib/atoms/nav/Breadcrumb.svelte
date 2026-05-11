<script lang="ts">
  /**
   * Antd-style breadcrumb: a horizontal trail of `BreadcrumbItem` entries.
   * Pass items via the `items` prop — each entry is either a plain label
   * or a `{ label, href }` link. Consumers can also use the children
   * snippet directly for richer structures.
   *
   * Separator defaults to a chevron-right SVG; pass any string in
   * `separator` to override (e.g. " / ").
   */
  export type BreadcrumbItem = {
    label: string;
    href?: string;
  };

  type Props = {
    items?: BreadcrumbItem[];
    separator?: string;
    children?: import("svelte").Snippet;
  };

  let { items = [], separator, children }: Props = $props();
</script>

<nav class="lt-breadcrumb" aria-label="Breadcrumb">
  {#if children}
    {@render children()}
  {:else}
    <ol class="lt-breadcrumb__list">
      {#each items as item, idx (idx + ":" + item.label)}
        <li class="lt-breadcrumb__item">
          {#if item.href && idx < items.length - 1}
            <a class="lt-breadcrumb__link" href={item.href}>{item.label}</a>
          {:else}
            <span
              class="lt-breadcrumb__current"
              aria-current={idx === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </span>
          {/if}
          {#if idx < items.length - 1}
            <span class="lt-breadcrumb__sep" aria-hidden="true">
              {#if separator}
                {separator}
              {:else}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              {/if}
            </span>
          {/if}
        </li>
      {/each}
    </ol>
  {/if}
</nav>

<style>
  .lt-breadcrumb {
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-sm);
    line-height: 1.4;
  }

  .lt-breadcrumb__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--lt-space-1);
  }

  .lt-breadcrumb__item {
    display: inline-flex;
    align-items: center;
    gap: var(--lt-space-1);
  }

  .lt-breadcrumb__link {
    color: var(--lt-color-text-secondary);
    text-decoration: none;
    transition: color var(--lt-motion-duration-fast) var(--lt-motion-ease);
  }

  .lt-breadcrumb__link:hover {
    color: var(--lt-color-text-link-hover);
    text-decoration: underline;
  }

  .lt-breadcrumb__current {
    color: var(--lt-color-text-primary);
    font-weight: var(--lt-font-weight-medium);
  }

  .lt-breadcrumb__sep {
    color: var(--lt-color-text-quaternary);
    display: inline-flex;
    align-items: center;
  }
</style>
