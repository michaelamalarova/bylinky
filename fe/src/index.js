import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './i18n.js'

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';


//import Map from './pages/Map';
import './styles/index.css';

console.log("Index.js loaded");

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
