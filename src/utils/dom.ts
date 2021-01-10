export const on = function (element: HTMLElement | Document | Window, event: string, handle: EventListenerOrEventListenerObject, useCapture = false): void {
  if (element && event && handle) {
    return element.addEventListener(event, handle, useCapture)
  }
}

export const off = function (element: HTMLElement | Document | Window, event: string, handle?: EventListenerOrEventListenerObject): void {
  if (element && event && handle) {
    return element.removeEventListener(event, handle)
  }
}
