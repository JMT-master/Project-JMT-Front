import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { Footer} from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { CookiesProvider } from 'react-cookie';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"></link>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>   
    <CookiesProvider>
      <NavermapsProvider>
        <App />
      </NavermapsProvider>
    </CookiesProvider>
    <Footer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
