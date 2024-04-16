require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressValidator = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', expressValidator.body('password').isLength({ min: 5 }), async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        const result = await db.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.json({ success: true, message: 'User registered!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user.' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const [users] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length && await bcrypt.compare(password, users[0].password)) {
        const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token: 'Bearer ' + token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.get('/birds', (req, res) => {
    db.query('SELECT * FROM birds', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/birds', (req, res) => {
    const { species, seen_at, location } = req.body;
    db.query('INSERT INTO birds (species, seen_at, location) VALUES (?, ?, ?)', [species, seen_at, location], (err, result) => {
        if (err) throw err;
        res.send({ success: true, message: 'Bird added successfully', id: result.insertId });
    });
});

app.put('/birds/:id', (req, res) => {
    const { id } = req.params;
    const { species, seen_at, location } = req.body;
    db.query('UPDATE birds SET species = ?, seen_at = ?, location = ? WHERE id = ?', [species, seen_at, location, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 0) {
            res.send({ success: false, message: 'No bird found with the given ID' });
        } else {
            res.send({ success: true, message: 'Bird updated successfully' });
        }
    });
});

app.delete('/birds/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM birds WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 0) {
            res.send({ success: false, message: 'No bird found with the given ID' });
        } else {
            res.send({ success: true, message: 'Bird deleted successfully' });
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});