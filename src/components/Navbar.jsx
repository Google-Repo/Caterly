import React from 'react';
import logo from '../assets/logo-02.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="Caterly Logo" />
        </a>
        
        <ul className="navbar-menu">
          <li className="navbar-item"><a href="#home" className="navbar-link active">Home</a></li>
          <li className="navbar-item"><a href="#about" className="navbar-link">About Us</a></li>
          <li className="navbar-item dropdown">
            <a href="#services" className="navbar-link">Services</a>
            <ul className="dropdown-menu">
              <li><a href="#foods-and-services" className="dropdown-link">Foods and services</a></li>
              <li><a href="#custom-food-and-services" className="dropdown-link">Custom food and services</a></li>
            </ul>
          </li>
          <li className="navbar-item"><a href="#menu" className="navbar-link">Menu</a></li>
          <li className="navbar-item"><a href="#contact" className="navbar-link">Contact</a></li>
        </ul>

        <div className="navbar-actions">
          <button className="btn-primary">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
