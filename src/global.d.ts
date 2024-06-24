import type library from './lib/use-bootstrap-dialog'

declare global {
  interface Window {
    UseBootstrapDialog: typeof library
  }
  const UseBootstrapDialog: typeof library
}
