<script lang="ts" module>
  export type DataTableColumn = {
    label: string;
    align?: "left" | "right" | "center";
    width?: string;
    nowrap?: boolean;
  };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    columns: DataTableColumn[];
    isEmpty?: boolean;
    body?: Snippet;
    empty?: Snippet;
    caption?: string;
    class?: string;
  };

  let {
    columns,
    isEmpty = false,
    body,
    empty,
    caption,
    class: className = "",
  }: Props = $props();
</script>

<div class={`lt-datatable ${className}`.trim()}>
  <table class="lt-datatable__table">
    {#if caption}
      <caption class="lt-datatable__caption">{caption}</caption>
    {/if}
    <colgroup>
      {#each columns as col}
        <col style={col.width ? `width: ${col.width};` : undefined} />
      {/each}
    </colgroup>
    <thead class="lt-datatable__head">
      <tr>
        {#each columns as col}
          <th
            class={`lt-datatable__head-cell lt-datatable__head-cell--align-${col.align ?? "left"} ${col.nowrap ? "lt-datatable__head-cell--nowrap" : ""}`.trim()}
            scope="col"
          >
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="lt-datatable__body">
      {#if isEmpty}
        <tr class="lt-datatable__empty-row">
          <td colspan={columns.length} class="lt-datatable__empty-cell">
            {#if empty}
              {@render empty()}
            {/if}
          </td>
        </tr>
      {:else if body}
        {@render body()}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .lt-datatable {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--lt-color-border-subtle);
    border-radius: var(--lt-radius-lg);
    background: var(--lt-color-surface);
    box-shadow: var(--lt-shadow-xs);
  }

  .lt-datatable__table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    font-size: var(--lt-text-md);
    color: var(--lt-color-text-primary);
  }

  .lt-datatable__caption {
    caption-side: top;
    text-align: start;
    padding: var(--lt-space-3) var(--lt-space-4);
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-sm);
  }

  .lt-datatable__head-cell {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--lt-color-surface-muted);
    border-block-end: 1px solid var(--lt-color-border-subtle);
    padding: var(--lt-space-3) var(--lt-space-4);
    color: var(--lt-color-text-tertiary);
    font-size: var(--lt-text-xs);
    font-weight: var(--lt-font-weight-medium);
    text-transform: uppercase;
    letter-spacing: var(--lt-tracking-wide);
    text-align: start;
    white-space: nowrap;
  }

  .lt-datatable__head-cell--align-right {
    text-align: end;
  }
  .lt-datatable__head-cell--align-center {
    text-align: center;
  }

  .lt-datatable__head-cell--nowrap {
    white-space: nowrap;
  }

  .lt-datatable__empty-cell {
    padding: 0;
    text-align: center;
    color: var(--lt-color-text-tertiary);
    border-block-end: none;
  }
</style>
