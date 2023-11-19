const Sequelize = require('sequelize');
require('dotenv').config();

// The sequelize variable is declared but not initialized.  It will be assigned a value in the ternary operator below depending
// on the environment the application is run within.
let sequelize;

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

exports.sequelize = sequelize;