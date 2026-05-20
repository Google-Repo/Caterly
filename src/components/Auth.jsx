import { useState } from "react";

import "./Auth.css";

const Auth = ({ onLogin, userRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("");

  const isCustomer = userRole === "customer";
  const isManager = userRole === "manager";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!isLogin) {
      if (password !== confirmPassword) {
        alert("Password and confirm password do not match");
        return;
      }

      // CUSTOMER signup -> existing endpoints
      if (isCustomer) {
        const customerName = formData.get("customerName");
        const mobileNumber = formData.get("mobileNumber");

        const payload = {
          role: userRole,
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
          alert("Account created successfully. Please login.");
          setIsLogin(true);
          return;
        }

        const data = await res.json().catch(() => ({}));
        alert(data.error || "Signup failed");
        return;
      }

      // MANAGER signup -> manager endpoints
      if (isManager) {
        const managerName = formData.get("managerName");
        const payload = {
          email,
          password,
          managerName: managerName || "",
        };

        const res = await fetch("http://localhost:8080/api/manager/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          alert("Manager account created successfully. Please login.");
          setIsLogin(true);
          return;
        }

        const data = await res.json().catch(() => ({}));
        alert(data.error || "Signup failed");
        return;
      }
    }

    // Login
    if (isCustomer) {
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
        } catch {
          // ignore
        }


        alert(data.error || `Login failed (HTTP ${res.status})`);
        return;
      }
    }

    if (isManager) {
      const payload = { email, password };
      const res = await fetch("http://localhost:8080/api/manager/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let data = {};
        try {
          data = await res.json();
        } catch {
          // ignore
        }

        alert(data.error || `Login failed (HTTP ${res.status})`);

        return;
      }
    }

    // Existing app behavior
    onLogin(selectedEvent);
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        <h2>
          {isLogin
            ? userRole === "manager"
              ? "Login as Caterly Manager"
              : "Login to Caterly"
            : userRole === "manager"
              ? "Sign Up as Caterly Manager"
              : "Sign Up for Caterly"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && isCustomer && (
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

          {!isLogin && isManager && (
            <input
              name="managerName"
              type="text"
              placeholder="Manager Name"
              required
            />
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
