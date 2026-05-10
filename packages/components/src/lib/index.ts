// atoms (interactive controls)
export { default as Alert } from "./atoms/Alert.svelte";
export { default as Avatar } from "./atoms/Avatar.svelte";
export { default as Button } from "./atoms/Button.svelte";
export { default as Field } from "./atoms/Field.svelte";
export { default as IconButton } from "./atoms/IconButton.svelte";
export { default as Input } from "./atoms/Input.svelte";
export { default as LinkButton } from "./atoms/LinkButton.svelte";
export { default as Mark } from "./atoms/Mark.svelte";
export { default as Pill } from "./atoms/Pill.svelte";
export { default as SectionLabel } from "./atoms/SectionLabel.svelte";
export { default as Spinner } from "./atoms/Spinner.svelte";
export { default as ThemeToggle } from "./atoms/ThemeToggle.svelte";
export { default as Wordmark } from "./atoms/Wordmark.svelte";

// primitives (layout + typography)
export { default as Cluster } from "./primitives/Cluster.svelte";
export { default as Code } from "./primitives/Code.svelte";
export { default as Divider } from "./primitives/Divider.svelte";
export { default as Frame } from "./primitives/Frame.svelte";
export { default as Heading } from "./primitives/Heading.svelte";
export { default as InfoList } from "./primitives/InfoList.svelte";
export { default as InfoRow } from "./primitives/InfoRow.svelte";
export { default as Inline } from "./primitives/Inline.svelte";
export { default as Pre } from "./primitives/Pre.svelte";
export { default as Split } from "./primitives/Split.svelte";
export { default as Stack } from "./primitives/Stack.svelte";
export { default as Stage } from "./primitives/Stage.svelte";
export { default as Surface } from "./primitives/Surface.svelte";
export { default as Text } from "./primitives/Text.svelte";

// composition (compound components)
export { default as AppShell } from "./composition/AppShell.svelte";
export { default as Card } from "./composition/Card.svelte";
export { default as CardHeader } from "./composition/CardHeader.svelte";
export { default as PageHeader } from "./composition/PageHeader.svelte";

// stores (theme + future state)
export {
  PREPAINT_SCRIPT,
  applyTheme,
  setTheme,
  theme,
  toggleTheme,
  type Theme,
} from "./stores/theme.js";
