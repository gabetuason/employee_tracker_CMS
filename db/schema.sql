-- Drop the employee_db database if it already exists and create a new one
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Using employee_db database
USE employee_db;

-- Create for department table 
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
-- Create for role table 
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) 
  REFERENCES department(id)
);
-- Create for employee table to store employee information
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) 
  REFERENCES employee(id)
);
