import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import mapboxgl from 'mapbox-gl';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './style/theme';
import { Fonts } from './style/fonts';

// Fix for prod mapbox-gl bug https://github.com/mapbox/mapbox-gl-js/issues/10173#issuecomment-750489778
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// https://bit.ly/CRA-vitals
reportWebVitals();
