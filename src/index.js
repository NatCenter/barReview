import React from 'react';
import ReactDOM from 'react-dom';
import { ApplicationViews } from './ApplicationViews';
import './index.css';
import { LogIn } from './LogIn/LogIn';
import { Register } from './LogIn/Register';
import { BrowserRouter } from "react-router-dom"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter  >
    
    <ApplicationViews/>
    </BrowserRouter>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
