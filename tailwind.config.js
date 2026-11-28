/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Values live in src/styles/theme.css; these names let Tailwind classes use them
      colors: {
        canvas: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        warm: "var(--warm)",
        cool: "var(--cool)",
        danger: "#A4332A",
        success: "#3F6B55",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
