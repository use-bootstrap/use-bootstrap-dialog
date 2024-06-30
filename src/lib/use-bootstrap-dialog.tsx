/* eslint-disable antfu/top-level-function */
import { name } from '../../package.json'
import { createDiv, createElement, getModal, merge, setElement } from './utils'

const shownClassName = `${name}-shown`

function getComponent(options: Component) {
  const modal = createDiv(`${name} ${name}-${options.type} modal fade`, 'tabindex="-1"')
  const [
    modalDialog,
    modalContent,
    modalHeader,
    modalTitle,
    modalBody,
    modalFooter,
  ] = [
    'dialog',
    'content',
    'header',
    'title',
    'body',
    'footer',
  ].map(cls => createDiv(`modal-${cls}`))
  const closeBtn = createElement('<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>')
  const cancelBtn = createElement('<button type="button" class="btn" data-bs-dismiss="modal"></button>')
  const okBtn = createElement('<button type="button" class="btn"></button>')

  modal.appendChild(modalDialog)
  modalDialog.appendChild(modalContent)
  modalContent.appendChild(modalHeader)
  modalHeader.appendChild(modalTitle)
  modalHeader.appendChild(closeBtn)
  modalContent.appendChild(modalBody)
  modalContent.appendChild(modalFooter)
  modalFooter.appendChild(cancelBtn)
  modalFooter.appendChild(okBtn)

  if (options.staticBackdrop) {
    modal.setAttribute('data-bs-backdrop', 'static')
    modal.setAttribute('data-bs-keyboard', 'false')
  }
  if (options.modalDialogClassName) {
    modalDialog.classList.add(...options.modalDialogClassName.split(' '))
  }
  document.body.insertAdjacentElement('afterbegin', modal)

  const instance = options.Modal.getOrCreateInstance(modal)
  modal.addEventListener('shown.bs.modal', () => {
    modal.classList.add(shownClassName)
  })
  modal.addEventListener('hidden.bs.modal', () => {
    modal.remove()
  })

  return {
    instance,
    modal,
    modalDialog,
    modalContent,
    modalHeader,
    modalTitle,
    closeBtn,
    modalBody,
    modalFooter,
    cancelBtn,
    okBtn,
  }
}

function getOptionsFromGlobal(type: 'alert'): AlertOptions
function getOptionsFromGlobal(type: 'confirm'): ConfirmOptions
function getOptionsFromGlobal(type: 'prompt'): PromptOptions
function getOptionsFromGlobal(type: Component['type']) {
  return window.UseBootstrapDialogOptions?.[type] ?? {}
}

// Default options
const defaultFooter: ModalFooter = {
  cancelBtn: {
    className: 'btn-secondary',
    html: 'Cancel',
  },
  okBtn: {
    className: 'btn-primary',
    html: 'OK',
  },
}
const defaultAlertOptions: AlertOptions = {
  closeBtn: true,
}
const defaultConfirmOptions: ConfirmOptions = {
  html: 'Are you sure ?',
  callback: () => {},
  title: {
    html: '<h5>Confirmation</h5>',
    closeBtn: true,
  },
  footer: defaultFooter,
}
const defaultPromptOptions = (form: string): PromptOptions => ({
  html: '',
  defaultValue: '',
  callback: () => {},
  required: false,
  closeBtn: true,
  footer: {
    ...defaultFooter,
    okBtn: {
      ...defaultFooter.okBtn,
      attributes: {
        form,
        type: 'submit',
      },
    },
  },
})

const UseBootstrapDialog = {
  alert(text: string | AlertOptions): AlertReturnType | undefined {
    const Modal = getModal()
    if (Modal) {
      let options: AlertOptions = merge(defaultAlertOptions, getOptionsFromGlobal('alert'))
      if (typeof text === 'string') {
        options.text = text
      }
      else {
        options = merge(options, text)
      }
      const { instance, modal, modalHeader, modalBody, modalFooter, closeBtn } = getComponent({
        type: 'alert',
        Modal,
        staticBackdrop: options.staticBackdrop,
        modalDialogClassName: options.modalDialogClassName,
      })
      modal.classList.add(`${name}-alert`)
      modalHeader.remove()
      modalFooter.remove()
      const flexbox = createDiv('modal-body-alert')
      const wrapper = createDiv('')
      setElement(wrapper, options)
      flexbox.appendChild(wrapper)
      modalBody.appendChild(flexbox)
      options.closeBtn && flexbox.appendChild(closeBtn)

      instance.show()
      modal.addEventListener('shown.bs.modal', () => {
        if (options.closeBtn) {
          closeBtn.focus()
        }
        else {
          document.querySelector<HTMLButtonElement>('[data-bs-dismiss="modal"]')?.focus()
        }
      })
      return {
        modal,
        hide: () => {
          const checkInterval = setInterval(() => {
            if (modal.classList.contains(shownClassName)) {
              instance.hide()
              clearInterval(checkInterval)
            }
          }, 100)
        },
      }
    }
  },

  confirm(confirmOptions: ConfirmOptions): void {
    const Modal = getModal()
    if (Modal) {
      const options: ConfirmOptions = merge(defaultConfirmOptions, getOptionsFromGlobal('confirm'), confirmOptions)

      const { instance, modal, modalTitle, closeBtn, modalBody, cancelBtn, okBtn } = getComponent({
        type: 'confirm',
        Modal,
        staticBackdrop: options.staticBackdrop,
        modalDialogClassName: options.modalDialogClassName,
      })
      setElement(modalTitle, options.title!)
      if (!options.title?.closeBtn) {
        closeBtn.remove()
      }
      setElement(modalBody, options)
      setElement(cancelBtn, options.footer!.cancelBtn!)
      setElement(okBtn, options.footer!.okBtn!)

      instance.show()
      modal.addEventListener('shown.bs.modal', () => {
        okBtn.focus()
      })
      let dispatched = false
      okBtn.addEventListener('click', () => {
        options.callback(true)
        dispatched = true
        instance.hide()
      })
      modal.addEventListener('hide.bs.modal', () => {
        if (!dispatched) {
          options.callback(false)
        }
      })
    }
  },

  prompt(promptOptions: PromptOptions): void {
    const Modal = getModal()
    if (Modal) {
      const formId = `form-${Math.random()}`
      const options = merge(defaultPromptOptions(formId), getOptionsFromGlobal('prompt'), promptOptions)

      const { instance, modal, modalTitle, modalBody, closeBtn, cancelBtn, okBtn } = getComponent({
        type: 'prompt',
        Modal,
        staticBackdrop: options.staticBackdrop,
        modalDialogClassName: options.modalDialogClassName,
      })
      setElement(modalTitle, options!)
      if (!options?.closeBtn) {
        closeBtn.remove()
      }
      setElement(cancelBtn, options.footer!.cancelBtn!)
      setElement(okBtn, options.footer!.okBtn!)

      const form = createElement(`<form></form`)
      form.id = formId
      const input = createElement('<input class="form-control">')
      input.value = options.defaultValue!
      input.required = options.required!
      form.appendChild(input)
      modalBody.append(form)

      instance.show()
      modal.addEventListener('shown.bs.modal', () => {
        input.focus()
      })

      form.addEventListener('submit', (e) => {
        e.preventDefault()
        options.callback(input.value)
        instance.hide()
      })
    }
  },
}

export default UseBootstrapDialog

interface Component {
  type: 'alert' | 'confirm' | 'prompt'
  Modal: ReturnType<typeof getModal>
  staticBackdrop?: boolean
  modalDialogClassName?: string
}

interface Content {
  text?: string
  html?: string
}

interface ModalTitle extends Content {
  closeBtn?: boolean
}

interface ModalFooter {
  cancelBtn?: Content & {
    className?: string
    attributes?: Record<string, string>
  }
  okBtn?: Content & {
    className?: string
    attributes?: Record<string, string>
  }
}

export interface AlertOptions extends ModalTitle {
  staticBackdrop?: boolean
  modalDialogClassName?: string
}

interface AlertReturnType {
  modal: HTMLDivElement
  hide: () => void
}

export interface ConfirmOptions extends Content {
  staticBackdrop?: boolean
  modalDialogClassName?: string
  callback: (confirmed: boolean) => any
  title?: ModalTitle
  footer?: ModalFooter
}

export interface PromptOptions extends ModalTitle {
  staticBackdrop?: boolean
  modalDialogClassName?: string
  callback: (value: string) => any
  defaultValue?: string
  required?: boolean
  footer?: ModalFooter
}

export type Optional<T> = {
  [K in keyof T]?: T[K] extends object ? Optional<T[K]> : T[K];
}

declare global {
  interface Window {
    UseBootstrapDialogOptions: {
      alert?: Optional<AlertOptions>
      confirm?: Optional<ConfirmOptions>
      prompt?: Optional<PromptOptions>
    }
  }
}
