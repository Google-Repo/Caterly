import "./ManagerDashboard.css";

const ManagerDashboard = ({ managerName, onLogout, latestRequest }) => {
  return (
    <div className="manager-dashboard">
      <div className="manager-header">
        <h1>Caterly Manager Dashboard</h1>
        <p className="manager-subtitle">
          {managerName
            ? `Welcome, ${managerName}`
            : "Manage your Caterly accounts"}
        </p>
      </div>

      <div className="manager-cards">
        <div className="manager-card manager-card-highlight">
          <h3>Latest Package Request</h3>
          {latestRequest ? (
            <p>
              <b>{latestRequest.category}</b> — {latestRequest.packageName}
            </p>
          ) : (
            <p>No package selected yet.</p>
          )}
        </div>
        <div className="manager-card">
          <h3>Bookings / Requests</h3>
          <p>View and manage incoming requests (coming soon).</p>
        </div>
        <div className="manager-card">
          <h3>Packages</h3>
          <p>Update offerings and pricing (coming soon).</p>
        </div>
        <div className="manager-card">
          <h3>Reports</h3>
          <p>Generate daily/weekly reports (coming soon).</p>
        </div>
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
