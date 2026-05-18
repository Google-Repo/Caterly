-- MySQL schema for Caterly auth
USE caterly_db;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  role ENUM('customer','manager') NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(60) NOT NULL,
  customer_name VARCHAR(255) NULL,
  mobile_number VARCHAR(20) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
