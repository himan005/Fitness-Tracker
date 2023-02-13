/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix:'',
  mode:'jit',
  purge: {
    enabled:true,
    content: [
      './src/**/*.{html,ts,css,scss,sass,less}',
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
