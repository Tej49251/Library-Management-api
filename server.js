const express = require('express');
const app = express();
app.use(express.json());
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// Path to the database
const dbPath = path.join(__dirname, 'libraryData.db');
let db = null;


app.use(express.static(path.join(__dirname, 'public')));

// Function to connect to the database
const connectToDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000/');
    });
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
};

// Call the function to connect to the database
connectToDB();

// Root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System API');
});

// CRUD operations for Users
app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    const result = await db.run(query, [username, password]);
    res.status(201).json({ user_id: result.lastID });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    const users = await db.all(query);
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CRUD operations for Books
app.post('/books', async (req, res) => {
  const { title, author, published_date, available } = req.body;
  try {
    const query = `INSERT INTO books (title, author, published_date, available) VALUES (?, ?, ?, ?)`;
    const result = await db.run(query, [title, author, published_date, available]);
    res.status(201).json({ book_id: result.lastID });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/books', async (req, res) => {
  try {
    const query = `SELECT * FROM books`;
    const books = await db.all(query);
    res.json(books);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CRUD operations for Loans
app.post('/loans', async (req, res) => {
  const { user_id, book_id, loan_date, return_date } = req.body;
  try {
    const query = `INSERT INTO loans (user_id, book_id, loan_date, return_date) VALUES (?, ?, ?, ?)`;
    const result = await db.run(query, [user_id, book_id, loan_date, return_date]);
    res.status(201).json({ loan_id: result.lastID });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/loans', async (req, res) => {
  try {
    const query = `SELECT * FROM loans`;
    const loans = await db.all(query);
    res.json(loans);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
