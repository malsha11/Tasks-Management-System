# Tasks-Management-System

## Overview
This is a Task Management System built with React for the frontend and Node.js with Express for the backend. It allows users to manage tasks, projects.

## Features
- Create, read, update, and delete tasks
- Create, read, update, and delete projects
- Assign tasks to engineers within projects
- Manage project details such as project manager, deadlines, etc.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   
2. Navigate to the project directory:
     ```bash
     cd project-management-system

3. Install dependencies for both frontend and backend:
     ```bash
     cd frontend
     npm install
     cd ../backend
     npm install
4. Set up the MySQL database:

    Create a new database named project_management
    Import the database schema from backend/db/schema.sql
    Configure the backend:

5. Create a .env file in the backend directory  
   Add the following environment variables to .env:
   ```bash
      PORT=5000
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=your_mysql_password
      DB_NAME=project_management

 6. Start the backend server:
    ```bash
      cd backend
      npm start

7. Start the frontend development server:
    ```bash
      cd frontend
      npm start
8. Access the application in your web browser at http://localhost:3000






