// atoms — interactive controls grouped by behavioral family
export { default as Button } from "./atoms/button/Button.svelte";
export { default as CopyButton } from "./atoms/button/CopyButton.svelte";
export { default as IconButton } from "./atoms/button/IconButton.svelte";
export { default as LinkButton } from "./atoms/button/LinkButton.svelte";

export { default as Breadcrumb } from "./atoms/nav/Breadcrumb.svelte";
export type { BreadcrumbItem } from "./atoms/nav/Breadcrumb.svelte";
export { default as NavGroup } from "./atoms/nav/NavGroup.svelte";
export { default as NavItem } from "./atoms/nav/NavItem.svelte";

export { default as Avatar } from "./atoms/identity/Avatar.svelte";
export { default as Mark } from "./atoms/identity/Mark.svelte";
export { default as Wordmark } from "./atoms/identity/Wordmark.svelte";

export { default as Field } from "./atoms/form/Field.svelte";
export { default as Input } from "./atoms/form/Input.svelte";

export { default as Alert } from "./atoms/feedback/Alert.svelte";
export { default as Spinner } from "./atoms/feedback/Spinner.svelte";

export { default as Pill } from "./atoms/Pill.svelte";
export { default as SectionLabel } from "./atoms/SectionLabel.svelte";
export { default as ThemeToggle } from "./atoms/ThemeToggle.svelte";

// primitives — layout / surface / text / data vocabulary
export { default as Cluster } from "./primitives/layout/Cluster.svelte";
export { default as Inline } from "./primitives/layout/Inline.svelte";
export { default as Split } from "./primitives/layout/Split.svelte";
export { default as Stack } from "./primitives/layout/Stack.svelte";

export { default as Frame } from "./primitives/surface/Frame.svelte";
export { default as Stage } from "./primitives/surface/Stage.svelte";
export { default as Surface } from "./primitives/surface/Surface.svelte";

export { default as Code } from "./primitives/text/Code.svelte";
export { default as Heading } from "./primitives/text/Heading.svelte";
export { default as Pre } from "./primitives/text/Pre.svelte";
export { default as RelativeTime } from "./primitives/text/RelativeTime.svelte";
export { default as Text } from "./primitives/text/Text.svelte";

export { default as Divider } from "./primitives/data/Divider.svelte";
export { default as InfoList } from "./primitives/data/InfoList.svelte";
export { default as InfoRow } from "./primitives/data/InfoRow.svelte";
export { default as Skeleton } from "./primitives/data/Skeleton.svelte";

// composition — compound components
export { default as AppShell } from "./composition/AppShell.svelte";
export { default as Card } from "./composition/Card.svelte";
export { default as CardHeader } from "./composition/CardHeader.svelte";
export { default as DataTable } from "./composition/DataTable.svelte";
export type { DataTableColumn } from "./composition/DataTable.svelte";
export { default as DataTableCell } from "./composition/DataTableCell.svelte";
export { default as DataTableRow } from "./composition/DataTableRow.svelte";
export { default as Dialog } from "./composition/Dialog.svelte";
export { default as EmptyState } from "./composition/EmptyState.svelte";
export { default as PageHeader } from "./composition/PageHeader.svelte";
export { default as ProLayout } from "./composition/ProLayout.svelte";
export { default as ToastViewport } from "./composition/ToastViewport.svelte";

// stores — theme + future state
export {
  PREPAINT_SCRIPT,
  applyTheme,
  setTheme,
  theme,
  toggleTheme,
  type Theme,
} from "./stores/theme.js";

export {
  toast,
  toasts,
  dismiss as dismissToast,
  dismissAll as dismissAllToasts,
  type Toast,
  type ToastOptions,
  type ToastTone,
} from "./stores/toast.js";
