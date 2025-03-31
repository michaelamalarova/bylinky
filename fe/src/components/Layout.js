// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar'
import '../styles/Layout.css'

const Layout = ({ children }) => {
    return (
      <>
        <Navbar/>
        <main>
            {children}
        </main>
      </>
    );
  };

  export default Layout