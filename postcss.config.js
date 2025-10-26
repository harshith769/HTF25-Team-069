export default {
  plugins: {
    '@tailwindcss/postcss': {}, // This is the new line that fixes it
    autoprefixer: {},
  },
}