const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const Movie = require('./database/movie'); // Import the Movie model
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

function generateToken() {
    const payload = {
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // No token present
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        next();
    });
}
// Define routes here
app.get('/get-token', (req, res) => {
    const token = generateToken();
    res.json({ token: token });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}


// POST route to create a new movie
app.post('/movies', authenticateToken, async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
});

// GET route to retrieve movies
app.get('/movies', authenticateToken, async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to retrieve movies
app.get('/movies/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT or PATCH route to update a movie
app.put('/movies/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Movie.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            const updatedMovie = await Movie.findByPk(id);
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE route to delete a movie
app.delete('/movies/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Movie.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = app;
