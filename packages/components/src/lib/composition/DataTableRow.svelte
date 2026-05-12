<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAttributes<HTMLTableRowElement> & {
    interactive?: boolean;
    children?: Snippet;
  };

  let {
    interactive,
    children,
    onclick,
    class: className = "",
    ...rest
  }: Props = $props();

  const isInteractive = $derived(Boolean(onclick) || interactive);
</script>

<tr
  {...rest}
  {onclick}
  class={`lt-datatable__row ${isInteractive ? "lt-datatable__row--interactive" : ""} ${className}`.trim()}
>
  {@render children?.()}
</tr>

<style>
  .lt-datatable__row {
    transition: background-color var(--lt-motion-duration-fast)
      var(--lt-motion-ease);
  }

  .lt-datatable__row--interactive {
    cursor: pointer;
  }

  .lt-datatable__row:hover {
    background: var(--lt-color-surface-hover);
  }
</style>
