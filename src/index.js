import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Registratsiya faylini import qilamiz
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Shuni register() qilib qo'yamiz
serviceWorkerRegistration.register();