import { useState } from "react";

import "./Auth.css";

const Auth = ({ onLogin, userRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const customerName = formData.get("customerName");
    const mobileNumber = formData.get("mobileNumber");

    // Keep role from parent: customer / manager
    const role = userRole;

    if (!isLogin) {
      if (password !== confirmPassword) {
        alert("Password and confirm password do not match");
        return;
      }

      // If customer, send extra fields
      const payload = {
        role,
        email,
        password,
        customerName: customerName || "",
        mobileNumber: mobileNumber || "",
      };

      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // B: signup success ke baad login page par wapas aao
        alert("Account created successfully. Please login.");
        setIsLogin(true);
        return;
      }

      const data = await res.json().catch(() => ({}));
      alert(data.error || "Signup failed");
      return;
    } else {
      const payload = { email, password };
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let data = {};
        try {
          data = await res.json();
        } catch (e) {
          // ignore
        }
        alert(data.error || `Login failed (HTTP ${res.status})`);
        return;
      }
    }

    // Keep existing app behavior (eventType uses selectedEvent)
    // Login/Signup backend only cares about auth fields; do not require event selection
    onLogin(selectedEvent);
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        <h2>{isLogin ? "Login to Caterly" : "Sign Up for Caterly"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && userRole === "customer" && (
            <>
              <input
                name="customerName"
                type="text"
                placeholder="Customer Name"
                required
              />
              <input
                name="mobileNumber"
                type="tel"
                placeholder="Mobile Number"
                required
              />

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
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          {!isLogin && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            />
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
