const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      'dark',
      'bumblebee',
      'light',
      "retro"
    ]
  },

  plugins: [typography, daisyui]
};

module.exports = config;