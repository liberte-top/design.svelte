<script lang="ts">
  import IconButton from "./button/IconButton.svelte";

  type Props = {
    /** Current theme. Web layer reads this from useTheme store ($theme). */
    current: "light" | "dark";
    /** Click handler. Web layer's onToggle calls toggleTheme(). */
    onToggle: () => void;
    /** Optional accessible label override. */
    label?: string;
  };

  let { current, onToggle, label }: Props = $props();

  const ariaLabel = $derived(
    label ??
      (current === "dark" ? "Switch to light theme" : "Switch to dark theme"),
  );
</script>

<IconButton
  variant="ghost"
  size="md"
  aria-label={ariaLabel}
  aria-pressed={current === "dark"}
  onclick={onToggle}
>
  {#if current === "dark"}
    <!-- Sun (visible when current is dark; click switches to light) -->
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  {:else}
    <!-- Moon (visible when current is light; click switches to dark) -->
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  {/if}
</IconButton>
