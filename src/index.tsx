import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css'; // or wherever your global css is

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);