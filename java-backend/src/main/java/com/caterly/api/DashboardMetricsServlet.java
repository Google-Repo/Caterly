package com.caterly.api;

import com.caterly.db.DBUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DashboardMetricsServlet extends AuthServletBase {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            int totalCustomers = 0;
            int totalSelections = 0;

            JsonArray customers = new JsonArray();

            try (Connection conn = DBUtil.getConnection()) {
                try (PreparedStatement st = conn.prepareStatement(
                        "SELECT COUNT(*) AS cnt FROM customer_users")) {
                    try (ResultSet rs = st.executeQuery()) {
                        if (rs.next())
                            totalCustomers = rs.getInt("cnt");
                    }
                }

                try (PreparedStatement st = conn.prepareStatement(
                        "SELECT COUNT(*) AS cnt FROM package_selection_requests")) {
                    try (ResultSet rs = st.executeQuery()) {
                        if (rs.next())
                            totalSelections = rs.getInt("cnt");
                    }
                }

                // Reverting to aggregated view: shows counts per customer
                String sql = "SELECT LOWER(r.customer_email) AS customer_email, " +
                        "COALESCE(NULLIF(c.customer_name, ''), NULLIF(MAX(r.customer_name), ''), 'Anonymous Customer') AS customer_display_name, "
                        +
                        "COUNT(*) AS request_count, " +
                        "MAX(r.created_at) AS last_request_at, " +
                        "MAX(r.package_name) AS last_package_name " +
                        "FROM package_selection_requests r " +
                        "LEFT JOIN customer_users c ON LOWER(c.email) = LOWER(r.customer_email) " +
                        "GROUP BY LOWER(r.customer_email) " +
                        "ORDER BY last_request_at DESC";

                try (PreparedStatement st = conn.prepareStatement(sql)) {
                    try (ResultSet rs = st.executeQuery()) {
                        while (rs.next()) {
                            JsonObject row = new JsonObject();
                            row.addProperty("customerEmail", rs.getString("customer_email"));
                            row.addProperty("customerName", rs.getString("customer_display_name"));
                            row.addProperty("requestCount", rs.getInt("request_count"));
                            row.addProperty("lastPackageName", rs.getString("last_package_name"));
                            row.addProperty("timestamp", rs.getTimestamp("last_request_at").toString());
                            customers.add(row);
                        }
                    }
                }
            }

            JsonObject out = new JsonObject();
            out.addProperty("totalCustomers", totalCustomers);
            out.addProperty("totalSelections", totalSelections);
            out.add("customers", customers);

            writeJson(resp, HttpServletResponse.SC_OK, out.toString());
        } catch (Exception e) {
            e.printStackTrace(); // Log the error to the console for debugging
            writeJson(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "{\"error\":\"Database Error: " + e.getMessage().replace("\"", "\\\"") + "\"}");
        }
    }
}
