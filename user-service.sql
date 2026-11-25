show databases;
create database netflix_user_service;
use netflix_user_service;
create table users (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL, 
email VARCHAR(191) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role VARCHAR(50) NOT NULL DEFAULT 'USER');
show tables;
describe users;
SELECT id, email, password, role FROM users WHERE email = 'test1133@example.com';
select* from users;
UPDATE users
SET role = CONCAT('ROLE_', role)
WHERE role NOT LIKE 'ROLE_%';
SET SQL_SAFE_UPDATES = 0;
UPDATE users
SET role = CONCAT('ROLE_', role)
WHERE role NOT LIKE 'ROLE_%';
SET SQL_SAFE_UPDATES = 1;
SELECT id, email, name, role FROM users WHERE email = 'admin@gmail.com';
select * from users;






