const { User } = require('../models');

const userData = [
    {
        user_name: 'test_user',
        email: 'test@email.com',
        password: 12345678,
    },
    {
        user_name: 'testy_2',
        email: 'test_user2@email.com',
        password: 123456789,
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;