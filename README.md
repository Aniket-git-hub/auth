# Backend - Authentication

This is the backend part of the Auth System project, built with Node.js and Express.

## Prerequisites

-   Node.js installed
-   MySQL or MongoDB installed and running
-   [Frontend repository](#) cloned and set up

## Technologies Used

-   Node.js
-   Express
-   MySQL or MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/course-enrollment-system-backend.git
    ```

1. Install dependencies:

    ```bash
    cd course-enrollment-system-backend
    npm install
    ```

## Configuration

1. **Environment Variables**
   Create a `.env` file in the root of the project with the following content:

    ```env
     PORT=3001
     NODE_ENV=development
     DB_CONNECTION_STRING=mysql://username:password@localhost:3306/course_enrollment_system
    ```

    Update the `DB_CONNECTION_STRING` with your MySQL connection details.

1. **Database Setup**

    - MySQL:
        - Create a database named course_enrollment_system.
        - Update the database configuration in config/database.js.
    - MongoDB
        - Update the MongoDB connection string in config/database.js.

1. **Run Migrations**
   Run the following command to create the necessary tables:

    ```bash
     npm run migrate
    ```

    Update the `DB_CONNECTION_STRING` with your MySQL connection details.

## Running the Application

Start the backend server:

```bash
npm start
```

## API Endpoints

1. **Register User**
    - URL: `api/auth/register`
    - Method: POST
    - Request Body:
        ```json
        {
        	"username": "john_doe",
        	"email": "john.doe@example.com",
        	"password": "password123"
        }
        ```
    - Response:
        ```json
        {
        	"success": true,
        	"message": "User registered successfully"
        }
        ```
1. **Login User**
    - URL: `api/auth/login`
    - Method: POST
    - Request Body:
        ```json
        {
        	"email": "john.doe@example.com",
        	"password": "password123"
        }
        ```
    - Response:
        ```json
        {
        	"success": true,
        	"token": "your_jwt_token_here"
        }
        ```

## Authors

-   [AniketSingh](https://github.com/Aniket-git-hub/)
