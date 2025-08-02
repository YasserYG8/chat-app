import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */

export default {

  // Make sure the `content` path correctly points to your source files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // =====================================
  // CRITICAL: Make sure `daisyui` is in the plugins array
  // =====================================
  plugins: [daisyui],
  daisyui : {
  themes : [
    "light", 
    "dark", 
    "cupcake", 
    "bumblebee", 
    "emerald", 
    "corporate", 
    "synthwave", 
    "retro", 
    "cyberpunk", 
    "valentine", 
    "halloween",
    "garden",
    "forest",
    "aqua"
  ]
  
    }
  
  // This is where you would configure themes later.
  // For now, the default themes should work.
}
