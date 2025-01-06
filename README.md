# Onion Architecture Backend with Auth and Profile Management

## Overview
This project is a simple backend implementation inspired by the **Onion Architecture** principles. It includes authentication and profile management features built using Node.js and Express, with MongoDB as the database.

The project demonstrates clean separation of concerns with layers for Core, Application, Infrastructure, and Presentation. It adheres to the **dependency inversion principle** by ensuring that core business logic is independent of external frameworks or technologies.

---

## Features
- **User Authentication**:
  - Login with JWT-based authentication.
- **Profile Management**:
  - Create a profile linked to a user.
- **Scalable Architecture**:
  - Designed with Onion Architecture principles for maintainability and testability.

---

## Project Structure
```plaintext
src/
├── app.js                     # Entry point of the application
├── routes/                    # Defines routes for the app
│   ├── authRoutes.js          # Routes for authentication
│   └── profileRoutes.js       # Routes for profiles
├── core/                      # Core business logic (Entities and Interfaces)
│   ├── entities/
│   │   ├── User.js            # User entity
│   │   └── Profile.js         # Profile entity
│   └── interfaces/
│       ├── IUserRepository.js # User repository interface
│       └── IProfileRepository.js # Profile repository interface
├── application/               # Application services and use-cases
│   ├── services/
│   │   └── AuthService.js     # Auth-related services
│   └── use-cases/
│       ├── LoginUser.js       # Login user use-case
│       └── CreateProfile.js   # Create profile use-case
├── infrastructure/            # Implementation details (DB, external tools)
│   ├── db/
│   │   ├── MongoDBClient.js   # MongoDB connection logic
│   │   ├── UserRepository.js  # User repository implementation
│   │   ├── ProfileRepository.js # Profile repository implementation
│   │   └── models/
│   │       ├── UserModel.js   # MongoDB schema for User
│   │       └── ProfileModel.js # MongoDB schema for Profile
├── presentation/              # Handles requests and responses
│   └── controllers/
│       ├── AuthController.js  # Handles auth-related routes
│       └── ProfileController.js # Handles profile-related routes
├── .env                       # Environment variables
├── .gitignore                 # Ignore unnecessary files
└── package.json               # Node.js project dependencies
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (running locally or in the cloud)
- Docker (optional for containerized deployment)

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:karl130757/OnionBackendTemplate.git
   cd OnionBackendTemplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/onion_architecture
   JWT_SECRET=supersecretkey
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Your server should be running at `http://localhost:3000`.

---

## API Endpoints

### Authentication
- **POST /auth/login**
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "<jwt-token>"
    }
    ```

### Profile Management
- **POST /profiles**
  - Request Body:
    ```json
    {
      "userId": "<user-id>",
      "bio": "This is my bio",
      "location": "New York, USA"
    }
    ```
  - Response:
    ```json
    {
      "_id": "<profile-id>",
      "userId": "<user-id>",
      "bio": "This is my bio",
      "location": "New York, USA"
    }
    ```

---

## Running with Docker
1. Build the Docker image:
   ```bash
   docker build -t onion-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env onion-backend
   ```

3. Access the API at `http://localhost:3000`.

---

## Key Principles
- **Separation of Concerns**: The project is divided into distinct layers for better organization and testability.
- **Dependency Inversion**: High-level modules (e.g., use-cases) do not depend on low-level modules (e.g., database models). Instead, they rely on abstractions (interfaces).
- **Testability**: The architecture allows for easy unit testing of use-cases and services by mocking dependencies.

---

## Dependencies
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **Bcrypt**: Password hashing.
- **Jsonwebtoken**: JWT-based authentication.
- **Dotenv**: Environment variable management.

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

---

## License
This project is licensed under the MIT License.

