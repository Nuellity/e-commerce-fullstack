import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter} from "react-router-dom"
import { CartProvider } from "react-use-cart";








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter >
  <CartProvider>
    <App />
    </CartProvider>
    </BrowserRouter>
  </>
);

