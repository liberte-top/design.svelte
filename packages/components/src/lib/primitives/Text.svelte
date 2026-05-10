<script lang="ts">
  type Tone =
    | "default"
    | "secondary"
    | "tertiary"
    | "danger"
    | "success"
    | "warning"
    | "info";
  type Size = "xs" | "sm" | "md" | "base" | "lg";
  type Weight = "normal" | "medium" | "strong";
  type Align = "start" | "center" | "end";
  type As = "p" | "span" | "div";

  type Props = {
    tone?: Tone;
    size?: Size;
    weight?: Weight;
    align?: Align;
    as?: As;
    children?: import("svelte").Snippet;
  };

  let {
    tone = "default",
    size = "md",
    weight = "normal",
    align = "start",
    as = "p",
    children,
  }: Props = $props();

  const cls = $derived(
    `lt-text lt-text--t-${tone} lt-text--s-${size} lt-text--w-${weight} lt-text--a-${align}`,
  );
</script>

<svelte:element this={as} class={cls}>
  {@render children?.()}
</svelte:element>

<style>
  .lt-text {
    margin: 0;
    line-height: var(--lt-leading-normal);
  }

  .lt-text--t-default {
    color: var(--lt-color-text-primary);
  }
  .lt-text--t-secondary {
    color: var(--lt-color-text-secondary);
  }
  .lt-text--t-tertiary {
    color: var(--lt-color-text-tertiary);
  }
  .lt-text--t-danger {
    color: var(--lt-color-text-danger);
  }
  .lt-text--t-success {
    color: var(--lt-color-text-success);
  }
  .lt-text--t-warning {
    color: var(--lt-color-text-warning);
  }
  .lt-text--t-info {
    color: var(--lt-color-text-info);
  }

  .lt-text--s-xs {
    font-size: var(--lt-text-xs);
  }
  .lt-text--s-sm {
    font-size: var(--lt-text-sm);
  }
  .lt-text--s-md {
    font-size: var(--lt-text-md);
  }
  .lt-text--s-base {
    font-size: var(--lt-text-base);
  }
  .lt-text--s-lg {
    font-size: var(--lt-text-lg);
  }

  .lt-text--w-normal {
    font-weight: var(--lt-font-weight-normal);
  }
  .lt-text--w-medium {
    font-weight: var(--lt-font-weight-medium);
  }
  .lt-text--w-strong {
    font-weight: var(--lt-font-weight-strong);
  }

  .lt-text--a-start {
    text-align: start;
  }
  .lt-text--a-center {
    text-align: center;
  }
  .lt-text--a-end {
    text-align: end;
  }
</style>
