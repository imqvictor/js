-- Create the laundry_management database and users table
CREATE DATABASE IF NOT EXISTS laundry_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE laundry_management;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
