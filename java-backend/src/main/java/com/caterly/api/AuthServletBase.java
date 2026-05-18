package com.caterly.api;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

public abstract class AuthServletBase extends HttpServlet {

    private void setCorsHeaders(HttpServletResponse resp) {
        // Basic CORS for local dev (React -> Tomcat). Restrict in production.
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        resp.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        // Browser preflight may include Authorization even if your request doesn't.
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        resp.setHeader("Access-Control-Max-Age", "3600");
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setCorsHeaders(resp);

        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            resp.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        super.service(req, resp);
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    protected void writeJson(HttpServletResponse resp, int statusCode, String json)
            throws IOException {
        resp.setStatus(statusCode);
        resp.setContentType("application/json");
        resp.getWriter().write(json);
    }
}
