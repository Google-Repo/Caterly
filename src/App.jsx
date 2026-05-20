import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Splash from "./components/Splash";
import Auth from "./components/Auth";
import GourmetServices from "./components/GourmetServices";
import BreakfastPackages from "./components/BreakfastPackages";
import LunchPackages from "./components/LunchPackages";
import HiTeaPackages from "./components/HiTeaPackages";
import DinnerPackages from "./components/DinnerPackages";
import HospitalityEvents from "./components/HospitalityEvents";
import SideGourmetService from "./components/SideGourmetService";

import "./App.css";
import "./components/Auth.css";
import ManagerDashboard from "./components/ManagerDashboard";
import AboutUs from "./components/AboutUs";

const getStoredValue = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage for key:", key, error);
    return defaultValue;
  }
};

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [userRole, setUserRole] = useState(() =>
    getStoredValue("userRole", null),
  );
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    getStoredValue("isLoggedIn", false),
  );
  const [eventType, setEventType] = useState(() =>
    getStoredValue("eventType", "default"),
  );
  const [currentUserEmail, setCurrentUserEmail] = useState(() =>
    getStoredValue("currentUserEmail", ""),
  );
  const [currentUserName, setCurrentUserName] = useState(() =>
    getStoredValue("currentUserName", ""),
  );

  const [activeGourmetCategory, setActiveGourmetCategory] = useState(null);
  const [sideSelection, setSideSelection] = useState({
    visible: false,
    notification: "",
    selectedCategory: "",
    selectedPackage: "",
  });
  const [showAboutPage, setShowAboutPage] = useState(false);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("eventType");
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("currentUserName");

    // Reset state
    setIsLoggedIn(false);
    setIsStarted(false);
    setUserRole(null);
    setCurrentUserEmail("");
    setCurrentUserName("");
    setEventType("default");
    setActiveGourmetCategory(null);
    setShowAboutPage(false);
    setSideSelection({
      visible: false,
      notification: "",
      selectedCategory: "",
      selectedPackage: "",
    });
  };

  useEffect(() => {
    localStorage.setItem("userRole", JSON.stringify(userRole));
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("eventType", JSON.stringify(eventType));
  }, [eventType]);

  useEffect(() => {
    localStorage.setItem("currentUserEmail", JSON.stringify(currentUserEmail));
  }, [currentUserEmail]);

  useEffect(() => {
    localStorage.setItem("currentUserName", JSON.stringify(currentUserName));
  }, [currentUserName]);

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
        onLogin={(type, userData) => {
          setIsLoggedIn(true);
          if (type) setEventType(type);
          if (userData) {
            // Save user details to state for identification
            setCurrentUserEmail(userData.email || "");
            setCurrentUserName(
              userData.name ||
                userData.customer_name ||
                userData.manager_name ||
                "",
            );
          }
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

  const handleSelectPackageNotice = async (payload) => {
    // Scroll to Gourmet Services area so popup seems to “come from” that section
    const target = document.getElementById("gourmet-food-services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Ensure we have a valid email before sending the request
    const emailToSave = currentUserEmail;
    const nameToSave = currentUserName;

    if (!emailToSave) {
      console.error(
        "Cannot save selection: User email is missing. Please log in again.",
      );
      alert("Please log in to select a package."); // User feedback
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/package-selection",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail: emailToSave,
            customerName: nameToSave,
            category: payload.category,
            packageName: payload.packageName,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to save: ${response.statusText}`);
      }
    } catch (e) {
      // ignore saving failure; UI should still work
      console.error("Failed to save selection", e);
    }

    setSideSelection({
      visible: true,
      notification: `Notification: ${payload.packageName} selected. Manager will email you shortly.`,
      selectedCategory: payload.category,
      selectedPackage: payload.packageName,
    });

    // Ensure scroll after popup mount
    setTimeout(() => {
      const target2 = document.getElementById("gourmet-food-services");
      target2?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const renderGourmetContent = () => {
    switch (activeGourmetCategory) {
      case "breakfast":
        return (
          <BreakfastPackages
            onBack={handleBackToGourmetServices}
            onSelectPackage={handleSelectPackageNotice}
          />
        );
      case "lunch":
        return (
          <LunchPackages
            onBack={handleBackToGourmetServices}
            onSelectPackage={handleSelectPackageNotice}
          />
        );
      case "hi-tea":
        return (
          <HiTeaPackages
            onBack={handleBackToGourmetServices}
            onSelectPackage={handleSelectPackageNotice}
          />
        );
      case "dinner":
        return (
          <DinnerPackages
            onBack={handleBackToGourmetServices}
            onSelectPackage={handleSelectPackageNotice}
          />
        );
      default:
        return <GourmetServices onExploreCategory={handleExploreCategory} />;
    }
  };

  if (userRole === "manager") {
    return (
      <ManagerDashboard
        managerName={currentUserName}
        onLogout={handleLogout}
        latestRequest={{
          category: sideSelection.selectedCategory,
          packageName: sideSelection.selectedPackage,
        }}
      />
    );
  }

  return (
    <div className="app-container animate-fade-in" data-theme={eventType}>
      <Navbar
        onLogout={handleLogout}
        onAboutClick={() => setShowAboutPage(true)}
        onHomeClick={() => setShowAboutPage(false)}
      />

      {showAboutPage ? (
        <AboutUs onBack={() => setShowAboutPage(false)} />
      ) : (
        <>
          <Hero />
          <div id="services">
            {renderGourmetContent()}
            <HospitalityEvents />
          </div>
        </>
      )}

      <SideGourmetService
        visible={sideSelection.visible}
        notification={sideSelection.notification}
        selectedCategory={sideSelection.selectedCategory}
        selectedPackage={sideSelection.selectedPackage}
        onClear={() =>
          setSideSelection({
            visible: false,
            notification: "",
            selectedCategory: "",
            selectedPackage: "",
          })
        }
      />
    </div>
  );
};

export default App;
