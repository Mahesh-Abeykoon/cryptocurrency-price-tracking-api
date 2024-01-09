import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/App';
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Footer/>
    </BrowserRouter>
   
  </React.StrictMode>
);