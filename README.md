# Movie API

## Introduction
This project is a Node.js API for managing movie information. It allows users to create, read, update, and delete movie records. The API uses Express.js for routing, Sequelize as the ORM with SQLite as the database, and includes JWT-based authentication for secure access.

## Features
- Create movie records with titles, descriptions, and cast
- Retrieve movie records based on various criteria
- Update and delete movie records
- Secure API endpoints with JWT-based authentication

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Setup
1. Clone the repository:
   ```bash
   git clone github.com/hussamkurd/movie-api.git
   cd movie-api
   ```
2. Install dependencies:   
   ```bash
    npm install
   ```
   
3. write secret key:   
   write your JWT_SECRET secret key VALUE in .env file  
   ```bash
   JWT_SECRET=your_secret_key
   ```


## Usage
  Starting the Server
  Run the following command to start the API server:
  ```bash
  npm start
  ```
### API Endpoints
before requesting any endpoint, you need to generate a token

GET /get-token: return a token

sample of response
  ```bash
   {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA0MjE3MDQsImV4cCI6MTcwMDQyNTMwNH0.9uMCC7BbBPy_4qBkTb682U3vhl-_CRZl-H3zUJPJTlE"
   }
  ```
Then, you can set the token in any of the following endpoints by passing it as an auth header 
  ```bash
   Authorization: Bearer ${token}
   ```
Endpoints
  POST /movies: Create a new movie
  ```json
   Content-Type: application/json
   Authorization: Bearer {TOKEN}
   {
   "title": "Test Movie",
   "description": "Test Description",
   "cast": "Test Cast"
   }
  ```
  Following the auth process you can use the following endpoints
  ```bash
  GET /movies: Retrieve all movies 
  GET /movies/:id: Retrieve a movie by ID
  PUT /movies/:id: Update a movie's information
  DELETE /movies/:id: Delete a movie
  ```
## Running Tests
To run the automated tests for the API, execute:
   ```bash
    npm test
   ```
