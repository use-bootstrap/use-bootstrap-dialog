UseBootstrapDialog.confirm({
  title: {
    html: '<h6>Deactivate account</h6>',
  },
  html: 'Are you sure you want to deactivate your account? All of your data will be <b>permanently</b> removed. This action cannot be undone.',
  footer: {
    okBtn: {
      text: 'Deactivate',
      className: 'btn-danger',
    },
  },
  async callback(confirmed) {
    if (confirmed) {
      const loading = UseBootstrapDialog.alert({
        html: `<div class="spinner-border spinner-border-sm me-2" role="status"></div>Please wait...`,
        closeBtn: false,
        staticBackdrop: true,
      })

      // your processing code..
      // await ...

      if (loading) {
        loading.hide()
        loading.modal.addEventListener('hidden.bs.modal', () => {
          UseBootstrapDialog.alert({
            html: `
              <div class="d-flex gap-2">
                <svg class="text-success" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                Account deactivated.
              </div>
              `,
          })
        })
      }
    }
  },
})
