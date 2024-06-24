const defaultAlertOptions = {
  closeBtn: true,
}

const defaultConfirmOptions = {
  html: 'Are you sure ?',
  title: {
    html: '<h5>Confirmation</h5>',
    closeBtn: true,
  },
  footer: {
    cancelBtn: {
      className: 'btn-secondary',
      html: 'Cancel',
    },
    okBtn: {
      className: 'btn-primary',
      html: 'OK',
    },
  },
}

const defaultPromptOptions = {
  required: false,
  closeBtn: true,
  footer: {
    cancelBtn: {
      className: 'btn-secondary',
      html: 'Cancel',
    },
    okBtn: {
      className: 'btn-primary',
      html: 'OK',
    },
  },
}
