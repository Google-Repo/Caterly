package com.caterly.api;

import com.caterly.db.DBUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class PackageSelectionServlet extends AuthServletBase {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            JsonObject json = JsonParser.parseReader(req.getReader()).getAsJsonObject();

            // Customer identity - using email as we don't have auth/session in this project
            String customerEmail = (json.has("customerEmail") && !json.get("customerEmail").isJsonNull())
                    ? json.get("customerEmail").getAsString().trim()
                    : null;
            if (customerEmail == null || customerEmail.trim().isEmpty()) {
                writeJson(resp, HttpServletResponse.SC_BAD_REQUEST, "{\"error\":\"customerEmail required\"}");
                return;
            }

            String customerName = (json.has("customerName") && !json.get("customerName").isJsonNull())
                    ? json.get("customerName").getAsString().trim()
                    : null;
            String category = (json.has("category") && !json.get("category").isJsonNull())
                    ? json.get("category").getAsString()
                    : null;
            String packageName = (json.has("packageName") && !json.get("packageName").isJsonNull())
                    ? json.get("packageName").getAsString()
                    : null;

            if (category == null || category.trim().isEmpty() || packageName == null || packageName.trim().isEmpty()) {
                writeJson(resp, HttpServletResponse.SC_BAD_REQUEST,
                        "{\"error\":\"category and packageName required\"}");
                return;
            }

            try (Connection conn = DBUtil.getConnection()) {
                // Authoritative Lookup: Always try to get the real name from the users table
                String lookupSql = "SELECT customer_name FROM customer_users WHERE email = ?";
                try (PreparedStatement lpst = conn.prepareStatement(lookupSql)) {
                    lpst.setString(1, customerEmail);
                    try (ResultSet rs = lpst.executeQuery()) {
                        if (rs.next()) {
                            String dbName = rs.getString("customer_name");
                            if (dbName != null && !dbName.trim().isEmpty()) {
                                customerName = dbName;
                            }
                        }
                    }
                }

                String sql = "INSERT INTO package_selection_requests (customer_email, customer_name, category, package_name) VALUES (?, ?, ?, ?)";

                try (PreparedStatement st = conn.prepareStatement(sql)) {
                    st.setString(1, customerEmail);
                    st.setString(2, (customerName == null || customerName.isEmpty()) ? null : customerName);
                    st.setString(3, category);
                    st.setString(4, packageName);
                    st.executeUpdate();
                }
            }

            writeJson(resp, HttpServletResponse.SC_OK, "{\"message\":\"Selection saved\"}");
        } catch (Exception e) {
            writeJson(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "{\"error\":\"" + e.getMessage().replace("\"", "\\\"") + "\"}");
        }
    }
}
