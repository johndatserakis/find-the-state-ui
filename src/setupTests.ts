import '@testing-library/jest-dom';

// @ts-ignore
window.URL.createObjectURL = function () {};

// @ts-ignore
window.gtag = jest.fn();

// resetMocks discussion: https://github.com/facebook/create-react-app/issues/9935
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    boxZoom: { disable: jest.fn() },
    doubleClickZoom: { disable: jest.fn() },
    dragPan: { disable: jest.fn() },
    dragRotate: { disable: jest.fn() },
    fitBounds: jest.fn(),
    keyboard: { disable: jest.fn() },
    on: jest.fn(),
    once: jest.fn(),
    remove: jest.fn(),
    scrollZoom: { disable: jest.fn() },
    touchZoomRotate: { disable: jest.fn() },
  })),
  NavigationControl: jest.fn(),
}));
