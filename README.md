Here's the `README.md` content in Markdown format for your project. You can copy and paste this into a `README.md` file:

```markdown
# Task Management API

This is a RESTful API for managing users and tasks. It is built with Express.js and provides various endpoints for user and task management.

## Table of Contents
1. [Setup](#setup)
2. [Environment Variables](#environment-variables)
3. [API Endpoints](#api-endpoints)
   - [User Endpoints](#user-endpoints)
   - [Task Endpoints](#task-endpoints)
4. [Error Handling](#error-handling)
5. [Middleware](#middleware)
6. [License](#license)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:** (See [Environment Variables](#environment-variables))

4. **Start the server:**
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following environment variables:

- `PORT`: The port number on which the server runs.
- `FRONTEND_URL`: The URL of the frontend application for CORS configuration.

Example:
```
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### User Endpoints

- **Get All Users**
  - **URL:** `/user/all`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all users.
  - **Response:** JSON array of users.

- **Get Current User**
  - **URL:** `/user/me`
  - **Method:** `GET`
  - **Description:** Retrieve the current authenticated user's information.
  - **Middleware:** `isAuthenticated`
  - **Response:** JSON object of the user's details.

- **Get User by ID**
  - **URL:** `/user/:id`
  - **Method:** `GET`
  - **Description:** Retrieve user information by user ID.
  - **Parameters:** `id` (String) - User ID
  - **Response:** JSON object of the user's details.

- **Create User**
  - **URL:** `/user/create`
  - **Method:** `POST`
  - **Description:** Create a new user.
  - **Body Parameters:** 
    - `name` (String) - User's name
    - `email` (String) - User's email
    - `password` (String) - User's password
  - **Response:** JSON object of the created user.

- **Login User**
  - **URL:** `/user/login`
  - **Method:** `POST`
  - **Description:** Login a user.
  - **Body Parameters:** 
    - `email` (String) - User's email
    - `password` (String) - User's password
  - **Response:** JSON object containing authentication token.

- **Logout User**
  - **URL:** `/user/logout`
  - **Method:** `POST`
  - **Description:** Logout the current user.
  - **Response:** JSON message confirming logout.

- **Delete User**
  - **URL:** `/user/:id`
  - **Method:** `DELETE`
  - **Description:** Delete a user by ID.
  - **Parameters:** `id` (String) - User ID
  - **Response:** JSON message confirming deletion.

- **Update User**
  - **URL:** `/user/:id`
  - **Method:** `PATCH`
  - **Description:** Update user details by ID.
  - **Parameters:** `id` (String) - User ID
  - **Body Parameters:** 
    - `name` (String) - (Optional) New name
    - `email` (String) - (Optional) New email
  - **Response:** JSON object of the updated user.

### Task Endpoints

- **Get All Tasks**
  - **URL:** `/task/all`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all tasks.
  - **Response:** JSON array of tasks.

- **Create Task**
  - **URL:** `/task/create`
  - **Method:** `POST`
  - **Description:** Create a new task.
  - **Middleware:** `isAuthenticated`
  - **Body Parameters:** 
    - `title` (String) - Task title
    - `description` (String) - Task description
    - `dueDate` (Date) - Due date of the task
  - **Response:** JSON object of the created task.

- **Get My Tasks**
  - **URL:** `/task/mytask`
  - **Method:** `GET`
  - **Description:** Retrieve tasks associated with the authenticated user.
  - **Middleware:** `isAuthenticated`
  - **Response:** JSON array of user's tasks.

- **Get Task by ID**
  - **URL:** `/task/:id`
  - **Method:** `GET`
  - **Description:** Retrieve task details by task ID.
  - **Parameters:** `id` (String) - Task ID
  - **Response:** JSON object of the task details.

- **Update Task**
  - **URL:** `/task/:id`
  - **Method:** `PUT`
  - **Description:** Update task details by ID.
  - **Middleware:** `isAuthenticated`
  - **Parameters:** `id` (String) - Task ID
  - **Body Parameters:** 
    - `title` (String) - (Optional) New title
    - `description` (String) - (Optional) New description
    - `dueDate` (Date) - (Optional) New due date
  - **Response:** JSON object of the updated task.

- **Mark Task as Completed**
  - **URL:** `/task/complete/:id`
  - **Method:** `PUT`
  - **Description:** Mark a task as completed.
  - **Middleware:** `isAuthenticated`
  - **Parameters:** `id` (String) - Task ID
  - **Response:** JSON object of the updated task.

- **Delete Task**
  - **URL:** `/task/:id`
  - **Method:** `DELETE`
  - **Description:** Delete a task by ID.
  - **Middleware:** `isAuthenticated`
  - **Parameters:** `id` (String) - Task ID
  - **Response:** JSON message confirming deletion.

## Error Handling

The API uses a custom error handling middleware to handle errors consistently. Errors are returned with a JSON response containing a message and an appropriate HTTP status code.

## Middleware

- **isAuthenticated:** This middleware checks if the user is authenticated before allowing access to certain routes.

- **errorMiddleware:** This middleware handles errors and sends a consistent JSON response.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## UseFul code snippet

````"start": "NODE_ENV=Production node index.js",
    "dev": "NODE_ENV=Development nodemon index.js"
````


## API URL 
 This is the API URL for authenticated todos with token, cookies and all!
 ```https://authenticated-todos-backend.onrender.com```
