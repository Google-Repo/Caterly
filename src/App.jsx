import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Splash from "./components/Splash";
import GourmetServices from "./components/GourmetServices"; // Import GourmetServices
import HospitalityEvents from "./components/HospitalityEvents"; // Import HospitalityEvents
import "./App.css";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return <Splash onStart={() => setIsStarted(true)} />;
  }

  return (
    <div className="app-container animate-fade-in">
      <Navbar />
      <Hero />
      {/* Add the Services section with its sub-components */}
      <div id="services">
        <GourmetServices />
        <HospitalityEvents />
      </div>
      {/* You can add other sections here if you have them, e.g., <About />, <Menu />, <Contact /> */}
    </div>
  );
};

export default App;
