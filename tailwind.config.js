module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: ({ theme }) => theme('spacing'),
      maxHeight: ({ theme }) => theme('spacing'),
      minWidth: ({ theme }) => theme('spacing'),
      minHeight: ({ theme }) => theme('spacing'),
    },
  },
  plugins: [],
}
