import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginForm from './Components/LoginForm/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import reportWebVitals from './reportWebVitals';
import Signup from './Signup/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const clientId = '1079304108039-utkh4notc6upa9pdfi8u467tb9jr85d8.apps.googleusercontent.com';
const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
    <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  </GoogleOAuthProvider>
);


reportWebVitals();
