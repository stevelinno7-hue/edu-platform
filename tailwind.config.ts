/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        lg: "800px",
        xl: "900px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1e40af",
        },
        success: "#16a34a",
        danger: "#dc2626",
        warning: "#f59e0b",
        muted: "#6b7280",
      },
      borderRadius: {
        base: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
