import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-primary": "var(--bg-primary-color)",
        "bg-secondary": "var(--bg-secondary-color)",
        "btn-primary": "var(--btn-primary-color)",
        "btn-hover-primary": "var(--btn-hover-primary-color)",
        "btn-success": "var(--btn-success-color)",
        "btn-hover-success": "var(--btn-hover-success-color)",
        "btn-danger": "var(--btn-danger-color)",
        "btn-hover-danger": "var(--btn-hover-danger-color)",
        "link-primary": "var(--link-primary-color)",
        "tag-secondary": "var(--tag-secondary-color)",
        "tag-danger": "var(--tag-danger-color)",
        "border-secondary": "var(--border-secondary-color)",
        "panel-primary": "var(--panel-primary-color)",
        "panel-hover-primary": "var(--panel-hover-primary-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
