const Sequelize = require('sequelize');
const sequelize = require('./database'); // import the sequelize instance

const Movie = sequelize.define('movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    cast: {
        type: Sequelize.STRING, // This can be a comma-separated string or a more complex type
        allowNull: true
    }
});

module.exports = Movie;
