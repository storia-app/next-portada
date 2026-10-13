"use client";

/** Switches light/dark and remembers the choice. */
export function ThemeToggle() {
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Cambiar tema"
      onClick={() => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
    >
      ◐
    </button>
  );
}
