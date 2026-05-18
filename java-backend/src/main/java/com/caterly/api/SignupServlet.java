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

public class SignupServlet extends AuthServletBase {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            JsonObject json = JsonParser.parseReader(req.getReader()).getAsJsonObject();
            String role = json.get("role").getAsString();
            String email = json.get("email").getAsString();
            String password = json.get("password").getAsString();
            String name = json.has("customerName") ? json.get("customerName").getAsString() : "";
            String mobile = json.has("mobileNumber") ? json.get("mobileNumber").getAsString() : "";

            String hash = BCrypt.hashpw(password, BCrypt.gensalt());

            try (Connection conn = DBUtil.getConnection()) {
                String sql = "INSERT INTO users (role, email, password_hash, customer_name, mobile_number) VALUES (?, ?, ?, ?, ?)";
                try (PreparedStatement st = conn.prepareStatement(sql)) {
                    st.setString(1, role);
                    st.setString(2, email);
                    st.setString(3, hash);
                    st.setString(4, name);
                    st.setString(5, mobile);
                    st.executeUpdate();
                }

                writeJson(resp, HttpServletResponse.SC_OK, "{\"message\":\"Success\"}");
            } catch (java.sql.SQLIntegrityConstraintViolationException e) {
                writeJson(resp, HttpServletResponse.SC_CONFLICT, "{\"error\":\"Email already registered\"}");
            }
        } catch (Exception e) {
            writeJson(resp, HttpServletResponse.SC_BAD_REQUEST, "{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}