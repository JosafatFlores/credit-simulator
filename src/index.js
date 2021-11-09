import React from 'react';
import ReactDOM from 'react-dom';
import { CreditSimulator } from './CreditSimulator';


import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/styles.scss"

ReactDOM.render(
  <React.StrictMode>
    <CreditSimulator />
  </React.StrictMode>,
  document.getElementById('root')
);
