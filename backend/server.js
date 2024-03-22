// Import required modules
const express = require('express'); // Express.js for handling HTTP requests
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling CORS (Cross-Origin Resource Sharing)
const mysql = require('mysql'); // MySQL module for database connection

// Create an instance of Express app
const app = express();
const port = process.env.PORT || 5000; // Set the port for the server

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'task_management', 
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define your API routes 


// Create a new project
app.post('/api/projects', (req, res) => {
  const { name, project_manager_id } = req.body;
  const query =
    'INSERT INTO projects (name, project_manager_id) VALUES (?, ?)';
  db.query(
    query,
    [name, project_manager_id],
    (err, result) => {
      if (err) {
        console.error('Error creating project:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('Project created successfully');
    }
  );
});

// Get all projects
app.get('/api/projects', (req, res) => {
  const query = 'SELECT * FROM projects';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching projects:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json(results);
  });
});

// Get a project by ID
app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM projects WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching project:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Project not found');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update a project by ID
app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, project_manager_id,tasks_name } = req.body;
  const query =
    'UPDATE projects SET name = ?, project_manager_id = ? WHERE id = ?';
  db.query(
    query,
    [name, project_manager_id,tasks_name, id],
    (err, result) => {
      if (err) {
        console.error('Error updating project:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('Project updated successfully');
    }
  );
});

// Delete a project by ID
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM projects WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting project:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Project deleted successfully');
  });
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const {
    project_id,
    title,
    tasks_name,
    description,
    status,
    priority,
    assigned_to,
    due_date,
  } = req.body;
  const query =
    'INSERT INTO tasks (project_id, title, tasks_name, description, status, priority, assigned_to, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(
    query,
    [
      project_id,
      title,
      tasks_name,
      description,
      status,
      priority,
      assigned_to,
      due_date,
    ],
    (err, result) => {
      if (err) {
        console.error('Error creating task:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('Task created successfully');
    }
  );
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json(results);
  });
});

// Get a task by ID
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tasks WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Task not found');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const {
    project_id,
    title,
    tasks_name,
    description,
    status,
    priority,
    assigned_to,
    due_date,
  } = req.body;
  const query =
    'UPDATE tasks SET project_id = ?, title = ?, tasks_name = ?, description = ?, status = ?, priority = ?, assigned_to = ?, due_date = ? WHERE id = ?';
  db.query(
    query,
    [
      project_id,
      title,
      tasks_name,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('Task updated successfully');
    }
  );
});

// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Task deleted successfully');
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Create a new task
app.post('/api/tasks', (req, res) => {
  const {
    project_id,
    title,
    tasks_name,
    description,
    status,
    priority,
    assigned_to,
    due_date,
  } = req.body;
  const query =
    'INSERT INTO tasks (project_id, title, tasks_name, description, status, priority, assigned_to, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(
    query,
    [
      project_id,
      title,
      tasks_name,
      description,
      status,
      priority,
      assigned_to,
      due_date,
    ],
    (err, result) => {
      if (err) {
        console.error('Error creating task:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('Task created successfully');
    }
  );
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json(results);
  });
});

// Get a task by ID
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tasks WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Task not found');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const {
    project_id,
    title,
    tasks_name,
    description,
    status,
    priority,
    assigned_to,
    due_date,
  } = req.body;
  const query =
    'UPDATE tasks SET project_id = ?, title = ?, tasks_name = ?, description = ?, status = ?, priority = ?, assigned_to = ?, due_date = ? WHERE id = ?';
  db.query(
    query,
    [
      project_id,
      title,
      tasks_name,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('Task updated successfully');
    }
  );
});

// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Task deleted successfully');
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});