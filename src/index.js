import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { Footer, HeaderTop } from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>   
    <NavermapsProvider ncpClientId='fsw3l45l8v' submodules={['panorama']}>
      <App />
    </NavermapsProvider>
    <Footer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
