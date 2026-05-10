<script lang="ts">
  type Tone = "subtle" | "default";

  type Props = {
    tone?: Tone;
  };

  let { tone = "subtle" }: Props = $props();
</script>

<hr class={`lt-divider lt-divider--${tone}`} />

<style>
  .lt-divider {
    margin: 0;
    border: 0;
    block-size: 1px;
    inline-size: 100%;
  }

  .lt-divider--subtle {
    background: var(--lt-color-border-subtle);
  }
  .lt-divider--default {
    background: var(--lt-color-border);
  }
</style>
