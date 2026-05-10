import React from 'react';
import bgImage from '../assets/first-page.jpg';
import './Splash.css';

const Splash = ({ onStart }) => {
  return (
    <div className="splash-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="splash-overlay">
        <button className="btn-primary btn-large splash-btn-overlay" onClick={onStart}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Splash;
