import React from 'react';
import './App.css';
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";

function App() {
  return (
    <div className="App">
        <div>
            <Navbar/>
            <Footer/>
        </div>
    </div>
  );
}

export default App;
