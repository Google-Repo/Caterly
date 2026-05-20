package com.caterly.api;

import com.caterly.db.DBUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.mindrot.jbcrypt.BCrypt;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class ManagerLoginServlet extends AuthServletBase {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            JsonObject json = JsonParser.parseReader(req.getReader()).getAsJsonObject();
            String email = json.get("email").getAsString();
            String password = json.get("password").getAsString();

            try (Connection conn = DBUtil.getConnection()) {
                String sql = "SELECT id, password_hash, manager_name FROM manager_users WHERE email = ?";
                try (PreparedStatement st = conn.prepareStatement(sql)) {
                    st.setString(1, email);
                    try (ResultSet rs = st.executeQuery()) {
                        if (rs.next()) {
                            String storedHash = rs.getString("password_hash");
                            if (BCrypt.checkpw(password, storedHash)) {
                                JsonObject responseJson = new JsonObject();
                                responseJson.addProperty("message", "Login successful");
                                responseJson.addProperty("userId", rs.getLong("id"));
                                responseJson.addProperty("role", "manager");
                                responseJson.addProperty("managerName", rs.getString("manager_name"));
                                writeJson(resp, HttpServletResponse.SC_OK, responseJson.toString());
                                return;
                            }
                        }

                        writeJson(resp, HttpServletResponse.SC_UNAUTHORIZED, "{\"error\":\"Invalid credentials\"}");
                    }
                }
            }
        } catch (Exception e) {
            writeJson(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
