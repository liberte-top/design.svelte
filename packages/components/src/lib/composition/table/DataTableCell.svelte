<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Align = "left" | "right" | "center";
  type Weight = "normal" | "medium" | "strong";
  type Tone = "primary" | "secondary" | "tertiary";

  type Props = HTMLAttributes<HTMLTableCellElement> & {
    align?: Align;
    mono?: boolean;
    weight?: Weight;
    tone?: Tone;
    nowrap?: boolean;
    children?: Snippet;
  };

  let {
    align = "left",
    mono = false,
    weight = "normal",
    tone = "primary",
    nowrap = false,
    children,
    class: className = "",
    ...rest
  }: Props = $props();
</script>

<td
  {...rest}
  class={`lt-datatable__cell lt-datatable__cell--align-${align} lt-datatable__cell--weight-${weight} lt-datatable__cell--tone-${tone} ${mono ? "lt-datatable__cell--mono" : ""} ${nowrap ? "lt-datatable__cell--nowrap" : ""} ${className}`.trim()}
>
  {@render children?.()}
</td>

<style>
  .lt-datatable__cell {
    padding: var(--lt-space-3) var(--lt-space-4);
    border-block-end: 1px solid var(--lt-color-border-subtle);
    vertical-align: middle;
    line-height: var(--lt-leading-snug);
    text-align: start;
  }

  /* last row in body: drop trailing divider so border-radius shows clean */
  :global(.lt-datatable__body > tr:last-child .lt-datatable__cell) {
    border-block-end: none;
  }

  .lt-datatable__cell--align-right {
    text-align: end;
  }
  .lt-datatable__cell--align-center {
    text-align: center;
  }

  .lt-datatable__cell--weight-medium {
    font-weight: var(--lt-font-weight-medium);
  }
  .lt-datatable__cell--weight-strong {
    font-weight: var(--lt-font-weight-strong);
  }

  .lt-datatable__cell--tone-secondary {
    color: var(--lt-color-text-secondary);
  }
  .lt-datatable__cell--tone-tertiary {
    color: var(--lt-color-text-tertiary);
  }

  .lt-datatable__cell--mono {
    font-family: var(--lt-font-family-mono);
    font-size: var(--lt-text-sm);
    letter-spacing: -0.01em;
  }

  .lt-datatable__cell--nowrap {
    white-space: nowrap;
  }
</style>
