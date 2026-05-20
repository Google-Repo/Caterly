- [x] Add backend API for dashboard metrics (customers + selection requests, per customer list)

- [x] Create MySQL tables for selected package requests (store customer_id/email, category, package_id/name, created_at)

- [x] Add API endpoint to fetch dashboard metrics + customer-wise request counts

- [x] Update React ManagerDashboard to call API and render:
  - total customers
  - total selections
  - customer list table with request counts (and optionally last selected package)

- [x] Update “Select Package” popup flow to save request to backend API

- [x] Test: MySQL tables created, backend endpoint works, dashboard shows correct numbers
