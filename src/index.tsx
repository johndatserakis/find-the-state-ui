import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// https://bit.ly/CRA-vitals
reportWebVitals();
