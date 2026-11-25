# 🎬 MiniFlix Subscription Management System

A Netflix-style subscription management system built with Spring Boot, React and MySQL. It uses a microservices architecture with three backend services (User, Subscription and Content), each with its own database and REST APIs, and a React frontend for user management.

## ✨ Features

### Users
- Register and log in with authentication
- Manage user account details
- Browse available content
- Choose and manage subscription plans

### Administrators
- Manage users
- Manage subscription plans
- Add and manage content

### General
- Microservices architecture (User, Subscription, Content)
- Separate MySQL database for each service
- REST APIs between the frontend and services
- Responsive UI built with Tailwind CSS

## 🛠️ Tech Stack

| Part | Technology |
|------|------------|
| Backend | Java, Spring Boot (Maven) |
| Database | MySQL |
| Frontend | React, Tailwind CSS |
| Tools | VS Code, IntelliJ IDEA, Git, GitHub |

## 📁 Project Structure

```
.
├── User-Service1/              # User service (registration, login, authentication)
│   └── User-Service1/
├── Subscription-service/       # Subscription service (plans and subscriptions)
├── content-service22/          # Content service (movies and content)
│   └── content-service/
├── user-management-frontend/   # React + Tailwind CSS web app
├── user-service.sql            # User database tables
├── subscription-service.sql    # Subscription database tables
├── content-service.sql         # Content database tables
└── .gitignore
```

## 🚀 Getting Started (Windows)

### 1. Install the requirements
- [Java JDK 17+](https://adoptium.net/)
- [Node.js](https://nodejs.org/) (LTS)
- [MySQL](https://dev.mysql.com/downloads/) (or XAMPP's MySQL)
- Git

### 2. Get the project
```bash
git clone https://github.com/achirapamuditha/miniflix-microservices.git
cd miniflix-microservices
```

### 3. Create the databases
Open MySQL (Workbench, phpMyAdmin or the command line) and import these files one by one:
1. `user-service.sql`
2. `subscription-service.sql`
3. `content-service.sql`

### 4. Check the database settings
Each Spring Boot service has an `application.properties` file in `src/main/resources/`. Set your own MySQL details:

```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

> The password in this repository is a placeholder. Change it to your real MySQL password locally, and do not commit it.

### 5. Start the backend services
Run each service from its own folder, in a separate terminal:

```bash
cd User-Service1/User-Service1
./mvnw spring-boot:run
```

Repeat for `Subscription-service` and `content-service22/content-service`.

### 6. Start the frontend
```bash
cd user-management-frontend
npm install
npm start
```

### 7. Open the site
Go to the address shown in the terminal, usually:

```
http://localhost:3000/
```

## ⚠️ Known Issues
- The database password in `application.properties` is a placeholder and must be changed before the services can connect.
- Service ports and API URLs are not documented yet. Check each `application.properties` and the frontend `src` folder.
- Secrets are stored in plain text in properties files. Environment variables would be safer.

## 🗺️ Future Improvements
- Add a root README with screenshots of the app
- Move database credentials to environment variables
- Add an API gateway and service discovery
- Add Docker support to run all services together
- Add payment integration for subscriptions

## 👤 Author
**D M A Pamuditha**
Software Engineering, NIBM
[GitHub](https://github.com/achirapamuditha) · [LinkedIn](https://www.linkedin.com/in/achira-pamuditha-4065663a3/)

## 📄 License
This project is for learning purposes.
