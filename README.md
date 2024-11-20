
Auth Service & User Management Service

This project implements two microservices (Auth Service and User Management Service) using Express.js, TypeORM, and PostgreSQL. The services communicate with each other using Redis Pub/Sub for real-time updates.

The system is containerized with Docker for easy deployment.
Project Overview
Auth Service

    Handles user authentication, JWT token management, and role-based access control (RBAC).
    Verifies and authorizes requests using roles and permissions.
    Listens for role updates from the User Management Service via Redis.

User Management Service

    Manages user profiles, roles, and CRUD operations.
    Publishes role updates to the Auth Service using Redis Pub/Sub.

Features
Auth Service

    User Authentication
        Login with email and password.
        JWT-based authentication and token issuance.
    Role-Based Access Control
        Middleware to restrict access based on roles.

User Management Service

    CRUD Operations
        Create, read, update, and soft delete users.
    Role Management
        Update user roles and notify Auth Service in real-time using Redis.

Architecture

The project is built using a microservice architecture. Below is an overview:

Getting Started
Prerequisites

    Node.js
    Docker and Docker Compose
    Redis
    PostgreSQL

Setup
1. Clone the Repository

git clone https://gitlab.com/backend-projects3141746/nodejs-projects/secure-microservices-authentication-and-user-management-system.git
cd microservices-project

2. Start Services with Docker Compose

docker-compose up --build

This will start the following:

    Auth Service on http://localhost:5000
    User Management Service on http://localhost:5001
    Redis and PostgreSQL containers.

Usage
Auth Service
Login Endpoint

    URL: POST /auth/login
    Body:

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:

    {
      "accessToken": "JWT_TOKEN",
      "user": {
        "id": "123",
        "email": "user@example.com",
        "roles": ["admin"]
      }
    }

Screenshot: Login Response

User Management Service
Update User Roles

    URL: PUT /users/:id
    Body:

{
  "roles": ["admin", "user"]
}

Response:

    {
      "message": "User roles updated successfully",
      "updatedUser": {
        "id": "123",
        "roles": ["admin", "user"]
      }
    }

Screenshot: Update Roles

Redis Pub/Sub in Action

    Update a user’s roles in the User Management Service:

curl -X PUT -H "Content-Type: application/json" \
     -d '{"roles": ["admin"]}' \
     http://localhost:5001/users/123

Observe the Auth Service logs:

    Received message from channel "role.updated": { userId: "123", roles: ["admin"] }
    Processing role update for user: 123 with roles: ["admin"]

Screenshot: Redis Communication

Project Structure
Auth Service

auth-service/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   └── server.ts
└── Dockerfile

User Management Service

user-management-service/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   └── server.ts
└── Dockerfile

Environment Variables

Both services use .env files for configuration. Below are required variables:
Auth Service

PORT=5000
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://redis:6379
POSTGRES_URL=postgres://user:password@postgres:5432/authdb

User Management Service

PORT=5001
REDIS_URL=redis://redis:6379
POSTGRES_URL=postgres://user:password@postgres:5432/userdb

Docker Setup
Docker Compose

    Defined in docker-compose.yml.
    Services:
        Auth Service
        User Management Service
        Redis
        PostgreSQL

services:
  auth-service:
    build: ./auth-service
    ports:
      - "5000:5000"
    depends_on:
      - redis
      - postgres

  user-management-service:
    build: ./user-management-service
    ports:
      - "5001:5001"
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: shared_db
    ports:
      - "5432:5432"

Screenshots

    Architecture Diagram:

    Login Response:

    Update Roles:

    Redis Logs:

Contributing

    Fork the repository.
    Create a feature branch: git checkout -b feature-name.
    Commit changes: git commit -m 'Add feature'.
    Push to branch: git push origin feature-name.
    Submit a pull request.

License

This project is licensed under the MIT License.