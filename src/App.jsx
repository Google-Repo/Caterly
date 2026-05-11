import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Splash from "./components/Splash";
import Auth from "./components/Auth"; // Import the Auth component
import GourmetServices from "./components/GourmetServices"; // Import GourmetServices
import BreakfastPackages from "./components/BreakfastPackages"; // Import BreakfastPackages
import LunchPackages from "./components/LunchPackages"; // Import LunchPackages
import HiTeaPackages from "./components/HiTeaPackages"; // Import HiTeaPackages
import DinnerPackages from "./components/DinnerPackages"; // Import DinnerPackages
import HospitalityEvents from "./components/HospitalityEvents"; // Import HospitalityEvents
import "./App.css";
import "./components/Auth.css"; // Reuse Auth styles for role selection

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventType, setEventType] = useState("default");
  const [activeGourmetCategory, setActiveGourmetCategory] = useState(null); // State to manage sub-views in Gourmet Services

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsStarted(false);
    setUserRole(null);
    setEventType("default");
    setActiveGourmetCategory(null); // Reset active category on logout
  };

  if (!isStarted) {
    return <Splash onStart={() => setIsStarted(true)} />;
  }

  if (!userRole) {
    return (
      <div className="auth-container">
        <div className="auth-card animate-fade-in">
          <h2>Welcome to Caterly</h2>
          <p style={{ marginBottom: "2rem", color: "var(--text-light)" }}>
            Please select your role to continue
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <button
              className="btn-primary"
              onClick={() => setUserRole("customer")}
            >
              Customer
            </button>
            <button
              className="btn-primary"
              onClick={() => setUserRole("manager")}
            >
              Caterly Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Auth
        onLogin={(type) => {
          setIsLoggedIn(true);
          if (type) setEventType(type);
        }}
        userRole={userRole}
      />
    );
  }

  const handleExploreCategory = (categoryId) => {
    setActiveGourmetCategory(categoryId);
  };

  const handleBackToGourmetServices = () => {
    setActiveGourmetCategory(null);
  };

  const renderGourmetContent = () => {
    switch (activeGourmetCategory) {
      case "breakfast":
        return <BreakfastPackages onBack={handleBackToGourmetServices} />;
      case "lunch":
        return <LunchPackages onBack={handleBackToGourmetServices} />;
      case "hi-tea":
        return <HiTeaPackages onBack={handleBackToGourmetServices} />;
      case "dinner":
        return <DinnerPackages onBack={handleBackToGourmetServices} />;
      default:
        return <GourmetServices onExploreCategory={handleExploreCategory} />;
    }
  };

  return (
    <div className="app-container animate-fade-in" data-theme={eventType}>
      <Navbar onLogout={handleLogout} />
      <Hero />
      {/* Add the Services section with its sub-components */}
      <div id="services">
        {renderGourmetContent()}
        <HospitalityEvents />
      </div>
      {/* You can add other sections here if you have them, e.g., <About />, <Menu />, <Contact /> */}
    </div>
  );
};

export default App;
