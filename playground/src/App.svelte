<script lang="ts">
  import {
    Alert,
    AppShell,
    Avatar,
    Button,
    Card,
    CardHeader,
    Cluster,
    Code,
    Divider,
    Field,
    Heading,
    InfoList,
    InfoRow,
    Inline,
    Input,
    LinkButton,
    Mark,
    PageHeader,
    Pill,
    Pre,
    SectionLabel,
    Spinner,
    Split,
    Stack,
    Surface,
    Text,
    ThemeToggle,
    Wordmark,
    applyTheme,
    theme,
    toggleTheme,
  } from "@liberte/svelte-components";
  import { IconSend } from "@liberte/svelte-icons";
  import { onMount } from "svelte";

  let count = $state(0);
  let email = $state("");
  let busy = $state(false);

  onMount(() => applyTheme());

  async function simulate() {
    busy = true;
    await new Promise((r) => setTimeout(r, 1200));
    busy = false;
  }
</script>

<AppShell width="lg">
  {#snippet header()}
    <Wordmark href="/" size="lg" mark>liberte.top</Wordmark>
  {/snippet}
  {#snippet aside()}
    <Pill tone="accent" variant="outline">design.svelte</Pill>
    <ThemeToggle current={$theme} onToggle={toggleTheme} />
  {/snippet}
  {#snippet footer()}
    <Inline gap="sm" align="center" justify="between" wrap>
      <Text size="sm" tone="tertiary">@liberte/svelte-components · 0.4.0</Text>
      <Inline gap="sm">
        <Pill size="sm" tone="neutral" variant="outline">light</Pill>
        <Pill size="sm" tone="neutral" variant="outline">dark</Pill>
      </Inline>
    </Inline>
  {/snippet}

  <Card>
    <PageHeader
      eyebrow="Components 0.4"
      title="Svelte package smoke"
      summary="A reference page that exercises every primitive, atom, and composition. Toggle the theme to see tokens repaint everything."
    >
      {#snippet actions()}
        <Button onclick={() => (count += 1)}>
          <IconSend size={18} aria-hidden="true" />
          Count {count}
        </Button>
        <Button variant="secondary">Secondary</Button>
      {/snippet}
    </PageHeader>
  </Card>

  <Split gap="md" min="md">
    <Card>
      <CardHeader>
        <SectionLabel>Brand</SectionLabel>
        <Heading level={2} size="md">Mark + Wordmark</Heading>
      </CardHeader>
      <Stack gap="md" align="start">
        <Inline gap="md" align="center">
          <Mark size="sm" />
          <Mark size="md" />
          <Mark size="lg" />
        </Inline>
        <Divider />
        <Stack gap="sm">
          <Wordmark size="sm" mark>liberte.top</Wordmark>
          <Wordmark size="md" mark>liberte.top</Wordmark>
          <Wordmark size="lg" mark>liberte.top</Wordmark>
        </Stack>
      </Stack>
    </Card>

    <Card>
      <CardHeader>
        <SectionLabel>Identity</SectionLabel>
        <Heading level={2} size="md">Avatar</Heading>
      </CardHeader>
      <Inline gap="md" align="center">
        <Avatar name="Liberte Operator" size="sm" />
        <Avatar name="Liberte Operator" size="md" />
        <Avatar name="A" size="lg" />
      </Inline>
    </Card>
  </Split>

  <Card>
    <CardHeader>
      <SectionLabel>Buttons</SectionLabel>
      <Heading level={2} size="md">Variants &amp; states</Heading>
    </CardHeader>
    <Stack gap="md">
      <Cluster gap="sm">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </Cluster>
      <Cluster gap="sm">
        <LinkButton href="#">Link primary</LinkButton>
        <LinkButton href="#" variant="secondary">Link secondary</LinkButton>
        <LinkButton href="#" variant="ghost">Link ghost</LinkButton>
      </Cluster>
      <Cluster gap="sm">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Cluster>
      <Cluster gap="sm">
        <Button onclick={simulate} disabled={busy}>
          {#if busy}<Spinner size="sm" />Pending{:else}Submit{/if}
        </Button>
        <Button variant="secondary" disabled={busy}>
          {#if busy}<Spinner size="sm" tone="muted" />{:else}Idle{/if}
        </Button>
      </Cluster>
    </Stack>
  </Card>

  <Card>
    <CardHeader>
      <SectionLabel>Status</SectionLabel>
      <Heading level={2} size="md">Pills</Heading>
    </CardHeader>
    <Stack gap="sm">
      <Cluster gap="xs">
        <Pill>neutral</Pill>
        <Pill tone="info">info</Pill>
        <Pill tone="success">success</Pill>
        <Pill tone="warning">warning</Pill>
        <Pill tone="danger">danger</Pill>
      </Cluster>
      <Cluster gap="xs">
        <Pill variant="solid">neutral</Pill>
        <Pill variant="solid" tone="info">info</Pill>
        <Pill variant="solid" tone="success">success</Pill>
        <Pill variant="solid" tone="warning">warning</Pill>
        <Pill variant="solid" tone="danger">danger</Pill>
      </Cluster>
      <Cluster gap="xs">
        <Pill variant="outline">neutral</Pill>
        <Pill variant="outline" tone="info">info</Pill>
        <Pill variant="outline" tone="success">success</Pill>
        <Pill variant="outline" tone="warning">warning</Pill>
        <Pill variant="outline" tone="danger">danger</Pill>
      </Cluster>
    </Stack>
  </Card>

  <Card>
    <CardHeader>
      <SectionLabel>Forms</SectionLabel>
      <Heading level={2} size="md">Field &amp; Input</Heading>
    </CardHeader>
    <Stack gap="md">
      <Field label="Email" required hint="We'll send a magic link.">
        <Input type="email" bind:value={email} placeholder="you@example.com" />
      </Field>
      <Field label="Disabled">
        <Input value="locked" disabled />
      </Field>
    </Stack>
  </Card>

  <Card>
    <CardHeader>
      <SectionLabel>Feedback</SectionLabel>
      <Heading level={2} size="md">Alerts</Heading>
    </CardHeader>
    <Stack gap="sm">
      <Alert tone="info">An info-level alert.</Alert>
      <Alert tone="success">Action completed successfully.</Alert>
      <Alert tone="warning">Heads up — something needs attention.</Alert>
      <Alert tone="danger">Something went wrong.</Alert>
    </Stack>
  </Card>

  <Card>
    <CardHeader>
      <SectionLabel>Data</SectionLabel>
      <Heading level={2} size="md">InfoList + Code</Heading>
    </CardHeader>
    <Stack gap="md">
      <InfoList>
        <InfoRow label="Subject"><Code>op-12ab34cd</Code></InfoRow>
        <InfoRow label="Auth type"><Text size="md">session</Text></InfoRow>
        <InfoRow label="Scopes">
          <Cluster gap="xs">
            <Pill tone="success">notes:read</Pill>
            <Pill tone="success">notes:write</Pill>
          </Cluster>
        </InfoRow>
      </InfoList>
      <Pre
        text={`{
  "subject": "op-12ab34cd",
  "auth_type": "session",
  "scopes": ["notes:read", "notes:write"]
}`}
      />
    </Stack>
  </Card>

  <Card>
    <CardHeader>
      <SectionLabel>Surface</SectionLabel>
      <Heading level={2} size="md">Tones</Heading>
    </CardHeader>
    <Split gap="sm" min="sm">
      <Surface tone="default" padding="md">
        <Text>default</Text>
      </Surface>
      <Surface tone="muted" padding="md">
        <Text>muted</Text>
      </Surface>
      <Surface tone="sunken" padding="md">
        <Text>sunken</Text>
      </Surface>
      <Surface tone="accent-soft" padding="md">
        <Text>accent-soft</Text>
      </Surface>
    </Split>
  </Card>
</AppShell>
