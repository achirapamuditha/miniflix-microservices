create database content_database;
use content_database
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
CREATE TABLE content (
    content_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    description TEXT,
    thumbnail_url VARCHAR(255),
    video_url VARCHAR(255),
    year DATE,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);
CREATE TABLE episode (
    episode_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(255),
    episode_no INT,
    release_date DATE,
    content_id INT,
    FOREIGN KEY (content_id) REFERENCES content(content_id) ON DELETE CASCADE
);
show tables;
select * from content


