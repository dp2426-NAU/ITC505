const Database = require('better-sqlite3');
const db = new Database('entries.db');

// Create the entries table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL
    )
`);

module.exports = db;
