import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Exceptional Catering for Your <span className="highlight">Special Events</span>
          </h1>
          <p className="hero-subtitle">
            Experience the finest culinary delights crafted with passion and fresh ingredients. 
            We make your weddings, corporate events, and parties unforgettable.
          </p>
          
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Events Catered</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Fresh Ingredients</p>
            </div>
            <div className="stat-item">
              <h3>5k+</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
        
        <div className="hero-image-wrapper animate-slide-in-right">
          <div className="hero-image-backdrop"></div>
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Delicious catering food" 
            className="hero-image"
          />
          
          {/* Floating badge for extra premium feel */}
          <div className="floating-badge badge-top">
            <span className="star-icon">⭐</span>
            <div>
              <p className="badge-title">Top Rated</p>
              <p className="badge-desc">Caterer in Town</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
