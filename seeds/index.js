const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const seedAll = async () => {
    // This is used to sync the models with the database.  The force: true option will drop and recreate tables if they exist.
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedPosts();

    await seedComments();

    process.exit(0);
};

seedAll();
