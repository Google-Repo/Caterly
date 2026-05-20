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

public class ManagerSignupServlet extends AuthServletBase {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            JsonObject json = JsonParser.parseReader(req.getReader()).getAsJsonObject();
            String email = json.get("email").getAsString();
            String password = json.get("password").getAsString();
            String managerName = json.has("managerName") ? json.get("managerName").getAsString() : "";

            String hash = BCrypt.hashpw(password, BCrypt.gensalt());

            try (Connection conn = DBUtil.getConnection()) {
                String sql = "INSERT INTO manager_users (email, password_hash, manager_name) VALUES (?, ?, ?)";
                try (PreparedStatement st = conn.prepareStatement(sql)) {
                    st.setString(1, email);
                    st.setString(2, hash);
                    st.setString(3, managerName);
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
