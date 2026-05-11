import React, { useState } from "react";
import "./Auth.css";

const Auth = ({ onLogin, userRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the selected event type back to the parent component
    onLogin(selectedEvent);
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        <h2>{isLogin ? "Login to Caterly" : "Sign Up for Caterly"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && userRole === "customer" && (
            <>
              <input type="text" placeholder="Customer Name" required />
              <input type="tel" placeholder="Mobile Number" required />
              <input type="text" placeholder="Event Name" required />
              <select
                required
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="" disabled>
                  Type of Event
                </option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="custom">Custom</option>
              </select>
            </>
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {!isLogin && (
            <input type="password" placeholder="Confirm Password" required />
          )}
          <button type="submit" className="btn-primary">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
