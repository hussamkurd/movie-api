const request = require('supertest');
const app = require('../app'); // Adjust the path to your server file

let movieId;
let token;

beforeAll(async () => {
    const response = await request(app).get('/get-token');
    token = response.body.token;
});

describe('POST /movies', () => {
    test('It should create a new movie', async () => {
        const newMovie = {
            title: 'Test Movie',
            description: 'Test Description',
            cast: 'Test Cast'
        };
        const response = await request(app)
            .post('/movies')
            .set('Authorization', `Bearer ${token}`)
            .send(newMovie);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newMovie.title);

        // Capture the ID of the newly created movie
        movieId = response.body.id;
    });
});


describe('GET /movies', () => {
    test('It should respond with an array of movies', async () => {
        const response = await request(app).get('/movies').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // Add more assertions as needed
    });
    test('It should retrieve a specific movie by ID', async () => {
        const response = await request(app).get(`/movies/${movieId}`).set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', movieId);
        // Additional assertions for movie properties
    });
});


describe('PUT /movies/:id', () => {
    test('It should update the movie details', async () => {
        const updatedMovie = {
            title: 'Updated Test Movie',
            description: 'Updated Description',
            cast: 'Updated Cast'
        };
        const response = await request(app)
            .put(`/movies/${movieId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedMovie);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedMovie.title);
    });
});

describe('DELETE /movies/:id', () => {
    test('It should delete the movie', async () => {
        const response = await request(app).delete(`/movies/${movieId}`).set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(204);
    });
});

