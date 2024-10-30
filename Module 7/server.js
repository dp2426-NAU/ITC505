const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let entries = [];
let currentId = 1;

// Get all entries
app.get('/entries', (req, res) => {
    res.json(entries);
});

// Create a new entry
app.post('/entries', (req, res) => {
    const newEntry = { id: currentId++, text: req.body.text };
    entries.push(newEntry);
    res.status(201).json(newEntry);
});

// Delete an entry
app.delete('/entries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    entries = entries.filter(entry => entry.id !== id);
    res.sendStatus(204);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
