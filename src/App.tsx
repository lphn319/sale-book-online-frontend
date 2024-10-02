import React from 'react';
import './App.css';
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import {layToanBoSach} from "./api/SachAPI";

function App() {
    layToanBoSach().then().catch();
  return (
    <div className="App">
        <div>
            <Navbar/>
            <HomePage/>
            <Footer/>
        </div>
    </div>
  );
}

export default App;
