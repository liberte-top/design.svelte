<script lang="ts">
  import {
    Button,
    Card,
    CardHeader,
    SectionLabel,
  } from "@liberte/svelte-components";
  import { IconSend } from "@liberte/svelte-icons";

  let count = $state(0);
</script>

<main class="playground-shell">
  <Card>
    <CardHeader>
      <SectionLabel>liberte design</SectionLabel>
      <h1>Svelte package smoke</h1>
      <p>Components and icons render through workspace package boundaries.</p>
    </CardHeader>

    <div class="actions">
      <Button onclick={() => (count += 1)}>
        <IconSend size={18} aria-hidden="true" />
        Count {count}
      </Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  </Card>
</main>

<style>
  .playground-shell {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
</style>
