<script lang="ts">
  /**
   * Circular avatar. Renders an image when `src` is supplied, otherwise
   * generates two-letter initials from `name` with a brand-tinted bg.
   * Sizes map to control heights so it pairs cleanly with form rows.
   */
  type Size = "sm" | "md" | "lg";

  type Props = {
    name?: string;
    src?: string | null;
    alt?: string;
    size?: Size;
  };

  let { name = "", src, alt, size = "md" }: Props = $props();

  function initials(value: string): string {
    const cleaned = value.trim();
    if (!cleaned) return "?";
    const parts = cleaned.split(/\s+/).filter(Boolean);
    const first = parts[0] ?? "";
    if (parts.length <= 1) return first.slice(0, 2).toUpperCase() || "?";
    const last = parts[parts.length - 1] ?? "";
    return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase() || "?";
  }

  const text = $derived(initials(name));
</script>

<span class={`lt-avatar lt-avatar--${size}`} aria-label={alt ?? name}>
  {#if src}
    <img class="lt-avatar__img" {src} alt={alt ?? name} />
  {:else}
    <span class="lt-avatar__initials" aria-hidden="true">{text}</span>
  {/if}
</span>

<style>
  .lt-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: var(--lt-radius-pill);
    background: var(--lt-color-surface-accent-soft);
    color: var(--lt-color-brand);
    overflow: hidden;
    user-select: none;
    border: 1px solid var(--lt-color-border-info);
  }

  .lt-avatar--sm {
    width: var(--lt-control-height-sm);
    height: var(--lt-control-height-sm);
    font-size: var(--lt-text-xs);
  }
  .lt-avatar--md {
    width: var(--lt-control-height);
    height: var(--lt-control-height);
    font-size: var(--lt-text-sm);
  }
  .lt-avatar--lg {
    width: var(--lt-control-height-lg);
    height: var(--lt-control-height-lg);
    font-size: var(--lt-text-md);
  }

  .lt-avatar__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .lt-avatar__initials {
    font-weight: var(--lt-font-weight-strong);
    letter-spacing: 0.02em;
    line-height: 1;
  }
</style>
