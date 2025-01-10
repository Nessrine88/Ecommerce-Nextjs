/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        buttons:"var(--buttons)",
        'leaf-green': '#7da43b',
        'light-green': '#98c676',
        'earth-brown': '#355e3b',
        'light-earth': '#f0f8f0',
      },
    },
  },
  
  plugins: [],
};
