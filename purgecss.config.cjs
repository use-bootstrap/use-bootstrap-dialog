module.exports = {
  css: ['docs/assets/*.css'],
  output: 'docs/assets',
  content: ['docs/**/*.{html,js}'],
  safelist: [
    /^use-bootstrap-dialog/,
    /^modal/,
    'fade',
    'show',
  ],
}
