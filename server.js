const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    const newNote = {...req.body, id:uniqid()};
    db.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(db), function catchErr(err) {
        if (err) console.log(err);
    })
    res.status(200).json(newNote);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});