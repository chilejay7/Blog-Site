const { User } = require('../models');

// The data populated corresponds to the fields defined in the User model.
const userData = [
    {
        user_name: 'test_user',
        email: 'test@email.com',
        password: 897,
    },
    {
        user_name: 'testy_2',
        email: 'test_user2@email.com',
        password: 989,
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;