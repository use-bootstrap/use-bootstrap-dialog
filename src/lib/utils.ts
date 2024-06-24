import type { Modal } from 'bootstrap-esm'

export function createElement(htmlstring: `<button${string}`): HTMLButtonElement
export function createElement(htmlstring: `<form${string}`): HTMLFormElement
export function createElement(htmlstring: `<input${string}`): HTMLInputElement
export function createElement(htmlstring: `<div${string}`): HTMLDivElement
export function createElement(htmlstring: string): HTMLElement {
  const div = document.createElement('div')
  div.innerHTML = htmlstring.trim()
  return div.firstElementChild as HTMLElement
}

export function createDiv(className?: string, attributes?: string) {
  return createElement(`<div class="${className ?? ''}" ${attributes ?? ''}></div>`)
}

export function setElement(
  element: HTMLElement,
  context: {
    text?: string
    html?: string
    className?: string
    attributes?: Record<string, string>
  }) {
  if (context.text) {
    element.textContent = context.text
  }
  else if (context.html) {
    element.innerHTML = context.html
  }
  context.className && element.classList.add(...context.className.split(' '))
  if (context.attributes) {
    for (const key of Object.keys(context.attributes)) {
      element.setAttribute(key, context.attributes[key])
    }
  }
}

export function getModal() {
  const plugin = (window as any)?.bootstrap?.Modal as typeof Modal | undefined
  if (!plugin) {
    throw new Error('bootstrap.Modal is not defined.')
  }
  return plugin
}

function isObject(obj: any): obj is Record<string, any> {
  return typeof obj === 'object' && obj !== null
}

export function merge<T extends Record<string, any>>(...objects: T[]): T {
  return objects.reduce<Record<string, any>>((result, current) => {
    Object.keys(current).forEach((key) => {
      if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key])
      }
      else {
        result[key] = current[key]
      }
    })
    return result
  }, {}) as T
}
