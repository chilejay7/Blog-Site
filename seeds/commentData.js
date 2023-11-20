const { Comment } = require('../models');

const commentData = [
    {
        comment_date: 'November 20, 2023 17:30',
        comment_content: 'This is hilarious',
        user_id: 2,
        post_id: 1,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

