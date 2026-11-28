/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // The whole app uses these sizes only: [size, line height]
    fontSize: {
      sm: ["0.875rem", "1.25rem"], // 14px: hints, small details
      base: ["1rem", "1.625rem"], // 16px: body text, buttons, inputs
      lg: ["1.25rem", "1.75rem"], // 20px: section headings, app name
      title: ["1.75rem", "2.25rem"], // 28px: page headings
    },
    extend: {
      // The app's color scheme. Change a value here to change it everywhere.
      colors: {
        canvas: "#F2F6F5", // page background
        surface: "#FFFFFF", // navigation, forms, inputs
        ink: "#17302D", // main text
        muted: "#4F6561", // secondary text
        line: "#D3E0DD", // dividers
        control: "#6F8782", // input and button borders
        brand: {
          DEFAULT: "#1F6F66", // main buttons, links, active page
          strong: "#17574F", // hover
          soft: "#DCEEEA", // hover background
        },
        danger: "#B42318",
        success: "#1E6B3A",
      },
      fontFamily: {
        sans: ["Lexend", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
