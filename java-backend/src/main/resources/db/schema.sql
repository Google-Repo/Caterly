-- MySQL schema for Caterly auth
CREATE DATABASE IF NOT EXISTS caterly_db;
USE caterly_db;

-- Drop tables in order of dependency to ensure a clean recreate
DROP TABLE IF EXISTS package_selection_requests;
DROP TABLE IF EXISTS manager_users;
DROP TABLE IF EXISTS customer_users;
DROP TABLE IF EXISTS users;

-- Dedicated table for Manager auth data
CREATE TABLE IF NOT EXISTS manager_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(60) NOT NULL,
  manager_name VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_manager_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dedicated table for Customer data (Separate from Manager)
CREATE TABLE IF NOT EXISTS customer_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(60) NOT NULL,
  customer_name VARCHAR(255) NULL,
  mobile_number VARCHAR(20) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_customer_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- General users table (Legacy/Optional)
-- Note: Login/Signup servlets should point to manager_users or customer_users specifically.
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(60) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Package selection requests (manager dashboard will show counts)
CREATE TABLE IF NOT EXISTS package_selection_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NULL,
  category VARCHAR(64) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_psr_customer_email (customer_email),
  INDEX idx_psr_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
