create	database subscription_service;
use subscription_service
CREATE TABLE plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    plan_name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   
);
CREATE TABLE plansubscribe (
 id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plan_id BIGINT,
    subscribed_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE SET NULL ON UPDATE CASCADE,
        INDEX idx_user_id (user_id),
    INDEX idx_is_active (is_active),
    INDEX idx_plan_id (plan_id),
    INDEX idx_subscribed_date (subscribed_date)
);
INSERT INTO plans (plan_name, price) VALUES 
    ('Basic Plan', 499.99),
    ('Standard Plan', 799.99),
    ('Premium Plan', 1199.99),
    ('Family Plan', 1499.99),
    ('Student Plan', 299.99);

show tables;
select * from plans
select* from plansubscribe
-- Clean and simple setup
CREATE DATABASE IF NOT EXISTS subscription_service;
USE subscription_service;

DROP TABLE IF EXISTS plansubscribe;
DROP TABLE IF EXISTS plans;

CREATE TABLE plans (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    plan_name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL
);

CREATE TABLE plansubscribe (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plan_id BIGINT,
    subscribed_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

INSERT INTO plans (plan_name, price) VALUES 
    ('Basic Plan', 499.99),
    ('Standard Plan', 799.99),
    ('Premium Plan', 1199.99);

INSERT INTO plansubscribe (user_id, plan_id, subscribed_date, is_active) VALUES
    (1, 1, CURDATE(), TRUE),
    (2, 2, CURDATE(), TRUE);

SELECT * FROM plans;
SELECT * FROM plansubscribe;




