// https://github.com/microsoft/TypeScript/issues/33128#issuecomment-526018445
declare global {
  interface Window {
    gtag: any;
  }
}

window.gtag = 'bar';

export {};
