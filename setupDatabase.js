const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./libraryData.db');

db.serialize(() => {
    // Create the users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);

    // Create the books table
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            book_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            published_date TEXT,
            available BOOLEAN DEFAULT TRUE
        )
    `);

    // Create the loans table
    db.run(`
        CREATE TABLE IF NOT EXISTS loans (
            loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            book_id INTEGER,
            loan_date TEXT NOT NULL,
            return_date TEXT,
            FOREIGN KEY(user_id) REFERENCES users(user_id),
            FOREIGN KEY(book_id) REFERENCES books(book_id)
        )
    `);
});

db.close(() => {
    console.log('Database setup complete.');
});
