import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from "./Store"
  import { ToastContainer, toast } from 'react-toastify';
import { backdropClasses } from '@mui/material';


const PUBLISHABLE_KEY = "pk_test_bmV3LXJhdmVuLTgyLmNsZXJrLmFjY291bnRzLmRldiQ"; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store} style={{background:"red"}}>



    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
       <ToastContainer />
    </Provider>
   
  
);

reportWebVitals();
