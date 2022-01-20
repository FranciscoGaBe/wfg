module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: ({ theme }) => theme('spacing'),
      maxHeight: ({ theme }) => theme('spacing'),
    },
  },
  plugins: [],
}
