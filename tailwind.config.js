module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  variants: {
	backgroundOpacity: ['disabled'],
	cursor: ['disabled'],
    textColor: ['responsive', 'hover', 'focus', 'visited'],
  },
  plugins: [],
}
