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

-   Request Body:
    `json
{
	"firstName": "singhdharmvir81",
	"lastName": "singhdharmvir81",
	"email": "test20@gmail.com",
	"password": "singhdharmvir81@gmail.com",
	"mobileNumber": "1234567890"
}
`
    -   Response:
        ```json
        {
        	"user": {
        		"createdAt": "2023-12-23T11:05:51.469Z",
        		"updatedAt": "2023-12-23T11:05:51.470Z",
        		"id": 31,
        		"firstName": "singhdharmvir81",
        		"lastName": "singhdharmvir81",
        		"email": "test20@gmail.com",
        		"mobileNumber": "1234567890"
        	},
        	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJpYXQiOjE3MDMzMjk1NTEsImV4cCI6MTcwMzMzMzE1MX0.qA0vwDwfPcShbW3yEYVmbDgSBnOcAdm1g5FnJeurcuw",
        	"message": "New user created"
        }
        ```

1. **Login User**
    - URL: `api/auth/login`
    - Method: POST
    - Request Body:
        ```json
        {
        	"email": "test9@gmail.com",
        	"password": "singhdharmvir81@gmail.com"
        }
        ```
    - Response:
        ```json
        {
        	"user": {
        		"id": 29,
        		"firstName": "singhdharmvir81",
        		"lastName": "singhdharmvir81",
        		"email": "test9@gmail.com",
        		"mobileNumber": "1234567890",
        		"createdAt": "2023-12-23T10:59:52.000Z",
        		"updatedAt": "2023-12-23T10:59:52.000Z"
        	},
        	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJpYXQiOjE3MDMzMjk1MDcsImV4cCI6MTcwMzMzMzEwN30.FWbo1nzBK0HuT4_KrM8vcAnqgWTrUTNMRcQJ01RYzwI",
        	"message": "login successful"
        }
        ```

## Authors

-   [AniketSingh](https://github.com/Aniket-git-hub/)
