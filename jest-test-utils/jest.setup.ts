// Due to an issue with jest types, each test file must `import '@testing-library/jest-dom';` to get proper typing

import '@testing-library/jest-dom/extend-expect';

// https://github.com/mapbox/mapbox-gl-js/issues/3436#issuecomment-485535598
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    boxZoom: {
      disable: jest.fn(),
    },
    doubleClickZoom: {
      disable: jest.fn(),
    },
    dragPan: {
      disable: jest.fn(),
    },
    dragRotate: {
      disable: jest.fn(),
    },
    fitBounds: jest.fn(),
    flyTo: jest.fn(),
    keyboard: {
      disable: jest.fn(),
    },
    on: jest.fn(),
    once: jest.fn(),
    remove: jest.fn(),
    scrollZoom: {
      disable: jest.fn(),
    },
    touchZoomRotate: {
      disable: jest.fn(),
    },
  })),
  NavigationControl: jest.fn(),
}));
