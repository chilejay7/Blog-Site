// The Sequelize class is required from the sequelize package.  A new instance is created in the connection environment defined below.
const Sequelize = require('sequelize');

// The dotenv package is required to obfuscate connection information for the database.
require('dotenv').config();

// The sequelize variable is declared but not initialized.  It will be assigned a value in the ternary operator below depending
// on the environment the application is run within.
let sequelize;

// The connection to the database is established using the information defined within the .env file and environment variables.
process.env.JAWSDB_URL ? sequelize = new Sequelize(process.env.JAWSDB_URL)
    : sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );

module.exports = sequelize;