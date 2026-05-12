import { writable, type Readable } from "svelte/store";

export type ToastTone = "success" | "danger" | "info" | "warning";

export type Toast = {
  id: string;
  tone: ToastTone;
  title: string;
  body?: string;
  duration: number;
};

export type ToastOptions = {
  body?: string;
  duration?: number;
};

const DEFAULT_DURATION = 4_000;

const toastsStore = writable<Toast[]>([]);

let counter = 0;

function emit(tone: ToastTone, title: string, options?: ToastOptions): string {
  const id = `lt-toast-${++counter}`;
  const duration = options?.duration ?? DEFAULT_DURATION;
  const entry: Toast =
    options?.body !== undefined
      ? { id, tone, title, body: options.body, duration }
      : { id, tone, title, duration };
  toastsStore.update((list) => [...list, entry]);
  if (duration > 0 && typeof window !== "undefined") {
    setTimeout(() => dismiss(id), duration);
  }
  return id;
}

export function dismiss(id: string): void {
  toastsStore.update((list) => list.filter((t) => t.id !== id));
}

export function dismissAll(): void {
  toastsStore.set([]);
}

export const toasts: Readable<Toast[]> = {
  subscribe: toastsStore.subscribe,
};

export const toast = {
  success: (title: string, options?: ToastOptions) =>
    emit("success", title, options),
  danger: (title: string, options?: ToastOptions) =>
    emit("danger", title, options),
  warning: (title: string, options?: ToastOptions) =>
    emit("warning", title, options),
  info: (title: string, options?: ToastOptions) => emit("info", title, options),
  dismiss,
  dismissAll,
};
