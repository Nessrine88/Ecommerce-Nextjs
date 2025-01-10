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
        buttons: "var(--buttons)",
        
        // Earth-tone colors
        'sand-100': '#F4E1B3',  // Light sandy beige
        'earth-beige': '#D9C6B6', // Earthy beige
        'dark-olive': '#4B4F2F',  // Deep olive green
        'moss-green': '#7A9A4B',  // Mossy green
        'earth-dark': '#6A4E23',  // Dark earthy brown
        'olive-green': '#8A9A5B', // Light olive green
        'earth-light': '#D0D0B2', // Light beige
        'leaf-green': '#6B8034',  // Leaf green
        'yellow-300': '#F8E3A1', // Light yellow (for instant delivery status)
        'red-500': '#D15D5D', // Soft red for non-eligible status
      },
    },
  },
  
  plugins: [],
};
