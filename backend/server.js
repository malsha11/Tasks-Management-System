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
  user: '', 
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

// Create a new engineer
app.post('/api/engineers', (req, res) => {
    const { name, email, phone, department, position, assigned_projects } = req.body;
    const query = 'INSERT INTO engineers (name, email, phone, department, position, assigned_projects) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, department, position, assigned_projects], (err, result) => {
      if (err) {
        console.error('Error creating engineer:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('Engineer created successfully');
    });
  });
  
  // Get all engineers
  app.get('/api/engineers', (req, res) => {
    const query = 'SELECT * FROM engineers';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching engineers:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).json(results);
    });
  });
  
  // Get an engineer by ID
  app.get('/api/engineers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM engineers WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching engineer:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Engineer not found');
      } else {
        res.status(200).json(results[0]);
      }
    });
  });
  
  // Update an engineer by ID
  app.put('/api/engineers/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, department, position, assigned_projects } = req.body;
    const query = 'UPDATE engineers SET name = ?, email = ?, phone = ?, department = ?, position = ?, assigned_projects = ? WHERE id = ?';
    db.query(query, [name, email, phone, department, position, assigned_projects, id], (err, result) => {
      if (err) {
        console.error('Error updating engineer:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('Engineer updated successfully');
    });
  });
  
  // Delete an engineer by ID
  app.delete('/api/engineers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM engineers WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting engineer:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('Engineer deleted successfully');
    });
  });
  


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
