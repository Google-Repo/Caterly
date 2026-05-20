import { useEffect, useState } from "react";

import "./ManagerDashboard.css";

const ManagerDashboard = ({ managerName, onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    totalSelections: 0,
    customers: [],
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0); // State to manually trigger refresh
  const POLLING_INTERVAL_MS = 5000; // Poll every 5 seconds

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:8080/api/dashboard/metrics");
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || `HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) setMetrics(data);
      } catch (e) {
        if (!cancelled)
          setError(e.message || "Failed to load dashboard metrics");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Initial load
    load();

    // Set up polling
    const intervalId = setInterval(load, POLLING_INTERVAL_MS);

    // Clean up interval on component unmount
    return () => {
      cancelled = true; // Prevent state updates on unmounted component
      clearInterval(intervalId);
    };
  }, [refreshTrigger]); // Re-run effect if refreshTrigger changes (for manual refresh)

  const handleManualRefresh = () => {
    setRefreshTrigger((prev) => prev + 1); // Increment to trigger useEffect
  };

  return (
    <div className="manager-dashboard">
      <div className="manager-header">
        <div className="header-content">
          <h1>Caterly Manager Dashboard</h1>
          <p className="manager-subtitle">
            {managerName
              ? `Welcome, ${managerName}`
              : "Manage your Caterly accounts"}
          </p>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary refresh-button"
            onClick={handleManualRefresh}
            disabled={loading}
          >
            {loading ? "⌛ Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>

      <div className="manager-cards">
        <div className="manager-card manager-card-highlight">
          <h3>Total Customers</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="metric-number">{metrics.totalCustomers}</p>
          )}
        </div>

        <div className="manager-card manager-card-highlight">
          <h3>Total Selections</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="metric-number">{metrics.totalSelections}</p>
          )}
        </div>

        <div className="manager-card">
          <h3>New Customers</h3>
          <p className="metric-number">{metrics.customers.length}</p>
        </div>

        <div className="manager-card">
          <h3>Avg. Requests</h3>
          <p className="metric-number">
            {metrics.totalCustomers > 0
              ? (metrics.totalSelections / metrics.totalCustomers).toFixed(1)
              : 0}
          </p>
        </div>
      </div>

      {error && <div className="dashboard-error">{error}</div>}

      <div className="manager-table-wrap">
        <h2 className="manager-table-title">Customer Selections</h2>

        {loading ? (
          <p>Loading table...</p>
        ) : metrics.customers && metrics.customers.length > 0 ? (
          <table className="manager-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Requests</th>
                <th>Last Package</th>
              </tr>
            </thead>
            <tbody>
              {metrics.customers.map((c) => (
                <tr key={c.customerEmail}>
                  <td>
                    <div className="cell-main">
                      {c.customerName || "(Name not set)"}
                    </div>
                    <div className="cell-sub">{c.customerEmail}</div>
                  </td>
                  <td className="cell-number">{c.requestCount}</td>
                  <td>
                    <div className="cell-main">{c.lastPackageName || "—"}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No selections yet.</p>
        )}
      </div>

      <div className="manager-footer">
        <button className="btn-primary" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ManagerDashboard;
