import React from "react";
import "./AboutUs.css";

const AboutUs = ({ onBack }) => {
  return (
    <section id="about" className="about-page">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          ← Back to Home
        </button>
      )}
      <div className="about-card animate-fade-in">
        <h2>About Caterly</h2>
        <p>
          At Caterly, we believe that every event deserves exceptional flavor
          and professional service. Whether it's a grand wedding, a corporate
          lunch, or an intimate birthday gathering, we provide curated gourmet
          experiences tailored to your needs. Our passion for culinary
          excellence ensures that your guests enjoy unforgettable moments.
        </p>
        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <p>Events Managed</p>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <p>Fresh Ingredients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
