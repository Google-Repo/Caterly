import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Splash from "./components/Splash";
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
    </div>
  );
};

export default App;
