window.UseBootstrapDialogOptions = {
  alert: {
    modalDialogClassName: 'modal-lg',
  },
  confirm: {
    title: {
      html: '<h5>Confirmación</h5>',
    },
    html: 'Está seguro ?',
    footer: {
      cancelBtn: {
        html: 'Cancelar',
      },
      okBtn: {
        className: 'btn-danger',
      },
    },
  },
  prompt: {
    closeBtn: false,
  },
}
