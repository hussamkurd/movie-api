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
   git clone https://github.com/hussamkurd/movie-api
   cd movie-api
   ```
## Install dependencies:
   ```bash
    npm install
   ```
## Usage
  Starting the Server
  Run the following command to start the API server:
  ```bash
  npm start
  ```
### API Endpoints
  ```bash
  POST /movies: Create a new movie
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
