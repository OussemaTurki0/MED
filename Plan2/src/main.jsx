import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind styles
import MainComponent from './components/MainComponent.jsx';
import './i18n'; // Import i18n setup

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>
);
