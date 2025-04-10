/** @type {import('tailwindcss').Config} */
export default {
    content: [  "./src/**/*.{js,jsx,ts,tsx}",             // all JS/TS files in src
        "./src/Components/**/*.{js,jsx,ts,tsx}",  // specifically all components
        "./src/Features/**/*.{js,jsx,ts,tsx}",    // all Redux slices
        "./src/Supabase/**/*.{js,jsx,ts,tsx}",    // if you ever use TS/JS in supabase folder
      ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  