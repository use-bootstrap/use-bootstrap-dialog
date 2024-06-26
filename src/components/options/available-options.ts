// Alert
interface AlertOptions {
  text?: string
  html?: string
  closeBtn?: boolean
  staticBackdrop?: boolean
  modalDialogClassName?: string
}

// Confirm
interface ConfirmOptions {
  callback: (confirmed: boolean) => any
  text?: string
  html?: string
  staticBackdrop?: boolean
  modalDialogClassName?: string
  title?: {
    text?: string
    html?: string
    closeBtn?: boolean
  }
  footer?: {
    cancelBtn?: {
      text?: string
      html?: string
      className?: string
      attributes?: Record<string, string>
    }
    okBtn?: {
      text?: string
      html?: string
      className?: string
      attributes?: Record<string, string>
    }
  }
}

// Prompt
interface PromptOptions {
  callback: (value: string) => any
  text?: string
  html?: string
  closeBtn?: boolean
  staticBackdrop?: boolean
  modalDialogClassName?: string
  defaultValue?: string
  required?: boolean
  footer?: {
    cancelBtn?: {
      text?: string
      html?: string
      className?: string
      attributes?: Record<string, string>
    }
    okBtn?: {
      text?: string
      html?: string
      className?: string
      attributes?: Record<string, string>
    }
  }
}
