/**
 * Theme store. Single source of truth for the active theme inside any
 * web that consumes @liberte/svelte-components. Webs:
 *
 *   import { theme, applyTheme, toggleTheme } from "@liberte/svelte-components";
 *
 *   // After mount: read whatever the pre-paint inline script set on <html>
 *   applyTheme();
 *
 *   // <ThemeToggle current={$theme} onToggle={toggleTheme} />
 *
 * Persistence is localStorage. The pre-paint inline script (in each web's
 * index.html / app.html) reads the same localStorage key + prefers-color-scheme
 * fallback before first paint to avoid FOUC. This module never persists
 * during SSR (guarded by typeof window).
 */
import { writable, get } from "svelte/store";

export type Theme = "light" | "dark";

const STORAGE_KEY = "liberte-theme";
const ATTRIBUTE = "data-theme";

function readInitial(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute(ATTRIBUTE);
  if (attr === "dark" || attr === "light") return attr;
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export const theme = writable<Theme>(readInitial());

/**
 * Reconcile the document attribute with the current store value. Call once
 * after mount on the client; safe to call multiple times.
 */
export function applyTheme(): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(ATTRIBUTE, get(theme));
}

export function setTheme(next: Theme): void {
  theme.set(next);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute(ATTRIBUTE, next);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, next);
  }
}

export function toggleTheme(): void {
  const current = get(theme);
  setTheme(current === "dark" ? "light" : "dark");
}

/**
 * The exact body of script that should run before first paint (typically
 * inlined in each web's host HTML head). Returns the JavaScript source.
 * Webs use this to keep parity with the store's read order without
 * duplicating the logic.
 */
export const PREPAINT_SCRIPT = `(function(){try{var k="${STORAGE_KEY}";var stored=localStorage.getItem(k);var t=stored==="light"||stored==="dark"?stored:(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("${ATTRIBUTE}",t);}catch(e){}})();`;
