const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static HTML files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database Connection Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Replace with your MySQL username
    password: 'kartik',      // Replace with your MySQL password
    database: 'user_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// Handle Form Submission
app.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    // Parameterized query to prevent SQL Injection
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Database Insertion Failed: ' + err.message);
        }
        res.send('<h1>User data successfully registered!</h1><a href="/">Go Back</a>');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});