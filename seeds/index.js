const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const seedAll = async () => {
    // This is used to sync the models with the database.  The force: true option will drop and recreate tables if they exist.
    await sequelize.sync({ force: true });

    // Users should not be seeded prior to creating accounts through the application.
    // The passwords need to be hashed in order to allow verification on login.
    // await seedUsers();

    await seedPosts();

    await seedComments();

    process.exit(0);
};

seedAll();
