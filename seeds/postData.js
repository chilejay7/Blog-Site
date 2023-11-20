const { Post } = require('../models');

const postData = [
    {
        title: 'My First Post',
        post_date: 'November 19, 2023 8:00',
        post_content: 'This is the first test post I have ever created.',
        user_id: 1,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;