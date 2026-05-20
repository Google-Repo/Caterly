import { useState } from "react";

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

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventType, setEventType] = useState("default");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const [activeGourmetCategory, setActiveGourmetCategory] = useState(null);
  const [sideSelection, setSideSelection] = useState({
    visible: false,
    notification: "",
    selectedCategory: "",
    selectedPackage: "",
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsStarted(false);
    setUserRole(null);
    setEventType("default");
    setActiveGourmetCategory(null);
    setSideSelection({
      visible: false,
      notification: "",
      selectedCategory: "",
      selectedPackage: "",
    });
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

  const handleSelectPackageNotice = (payload) => {
    // Scroll to Gourmet Services area so popup seems to “come from” that section
    const target = document.getElementById("gourmet-food-services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
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
        managerName={undefined}
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
      <Navbar onLogout={handleLogout} />
      <Hero />

      <div id="services">
        {renderGourmetContent()}
        <HospitalityEvents />
      </div>

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
