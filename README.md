# 📣 Campaigns Application

Welcome to the **Campaigns Application**! 🎉 This application allows you to manage marketing campaigns efficiently. It provides a RESTful API for creating, updating, retrieving, and deleting campaigns.

## 🚀 Getting Started

These instructions will help you set up the application locally using Docker.

### 🛠 Prerequisites

- **Docker** 🐳
- **Docker Compose**

Ensure you have Docker and Docker Compose installed on your machine.

### 📦 Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone git@github.com:VSSSP/campaigns.git
   cd campaigns
   ```

2. **Environment Variables**

   Create a `.env` file in the root directory and set the necessary environment variables:

   ```env
   # .env
   DB_HOST=db
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

### 🐳 Running the Application with Docker

To start the application and the database, run:

```bash
docker-compose up --build
```

This command will build the Docker images and start the containers for both the application and the PostgreSQL database.

- The application will be accessible at `http://localhost:3000`.
- The database service is named `db` and is accessible internally within Docker.

### 🧪 Running Integration Tests

Before running the integration tests, ensure the Docker containers are up and running.

1. **Install Dependencies**

   If you haven't already, install the project dependencies:

   ```bash
   npm install
   ```

2. **Run Tests**

   ```bash
   npm test
   ```

   The integration tests will run against the running application. Make sure that the application is running before executing the tests.

### 📋 API Documentation

The API follows RESTful principles and provides the following endpoints:

- **Authentication**
  - `POST /register` - Register a new user
  - `POST /login` - Login and receive a JWT token

- **Campaigns** (Requires Authentication)
  - `GET /campaigns` - Retrieve all campaigns
  - `POST /campaigns` - Create a new campaign
  - `GET /campaigns/{id}` - Retrieve a campaign by ID
  - `PUT /campaigns/{id}` - Update a campaign
  - `DELETE /campaigns/{id}` - Delete a campaign

### 🔧 Adjustments and Notes

- **Unique Emails**: The application requires unique email addresses for user registration.
- **JWT Authentication**: Protected routes require a valid JWT token in the `Authorization` header in the format `Bearer <token>`.

### 📝 License

This project is licensed under the MIT License.
