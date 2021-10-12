// https://github.com/microsoft/TypeScript/issues/33128#issuecomment-526018445
declare global {
  interface Window {
    gtag: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

window.gtag = '';

export {};
