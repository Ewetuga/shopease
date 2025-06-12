import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.jsx';         // Go up one level
import '../App.css';                  // Go up one level
import '../index.css';                // Go up one level
import '../styles.css';              // Go up one level

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
