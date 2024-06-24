const instance = UseBootstrapDialog.alert({
  staticBackdrop: true,
  closeBtn: false,
  text: 'I will close programmatically in 3 seconds.',
})

setTimeout(() => {
  if (instance) {
    instance.hide()
  }
}, 3000)
