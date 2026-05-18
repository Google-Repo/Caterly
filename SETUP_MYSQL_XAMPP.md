# MySQL (XAMPP) setup for Caterly Login/Signup

## 1) Start MySQL

1. Open **XAMPP Control Panel**
2. Start **MySQL**

## 2) Create Database

The backend uses the following defaults:

- DB name: `caterly_db`
- DB host: `localhost`
- DB user: `root`
- DB pass: (empty by default)

Create the DB in phpMyAdmin:

1. Open **http://localhost/phpmyadmin**
2. Click **New**
3. Database name: `caterly_db`
4. Click **Create**

## 3) Create tables (run schema.sql)

1. Select database **caterly_db**
2. Go to **SQL** tab
3. Paste and run the contents of:
   `java-backend/src/main/resources/db/schema.sql`

This will create the `users` table used by:

- `SignupServlet` (inserts rows)
- `LoginServlet` (selects and checks bcrypt hash)

## 4) If MySQL root password is NOT empty

Update backend DB password, because `DBUtil` reads env var `CATERLY_DB_PASS` (default is empty).

Options:

- Set env var `CATERLY_DB_PASS` to your MySQL root password before running Tomcat, **or**
- Change `DB_PASS` default in `DBUtil.java`.

## 5) Quick sanity checks

- `users.email` must be unique.
- Signup inserts `role` = `customer` or `manager`.
- Login checks bcrypt against `users.password_hash`.

After this, frontend requests should work:

- `POST http://localhost:8080/api/signup`
- `POST http://localhost:8080/api/login`
