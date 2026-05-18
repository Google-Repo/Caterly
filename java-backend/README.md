# Java Backend (Tomcat via XAMPP)

This folder contains a minimal **Java Servlet** backend packaged as a **WAR** for **Tomcat**.

## What you get

- Endpoint: `GET /api/health`
- Response: `{"status":"ok"}`

## Requirements

- Java (JDK) installed
- Apache Maven installed
- XAMPP installed (includes Tomcat)

## Build the WAR

From this folder:

```bat
cd "f:/Akshat Minor project/Caterly/Caterly/java-backend"
mvn clean package
```

After build, you should see a WAR file under:

- `target/java-backend.war`

## Deploy to XAMPP Tomcat (manual)

1. Start **Apache Tomcat** from the **XAMPP Control Panel**.
2. Copy the WAR file into Tomcat `webapps`.

Typical locations (may vary):

- `XAMPP/tomcat/webapps/`

3. Wait for Tomcat to deploy.

## Run via Maven (Tomcat plugin)

This project also supports running using Maven Tomcat plugin (goal `tomcat7:run`). This requires your Tomcat Manager to be accessible.

From this folder:

```bat
cd "f:/Akshat Minor project/Caterly/Caterly/java-backend"
mvn tomcat7:run
```

## Test URL

Tomcat usually runs on port **8080**.

Once deployed, the app context will typically be the WAR name without extension:

- `java-backend`

So try:

- `http://localhost:8080/java-backend/api/health`

## Notes

- If your React frontend calls this backend, CORS might be required depending on how you do requests.
- If you want, we can later add CORS support or a Vite proxy to avoid cross-origin issues.
