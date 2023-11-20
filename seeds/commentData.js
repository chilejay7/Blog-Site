const { Comment } = require('../models');

// The data populated corresponds to the fields defined in the Comment model.
const commentData = [
    {
        comment_date: 'November 20, 2023 17:30:00',
        comment_content: 'Nice job on the first post.',
        user_id: 2,
        post_id: 1,
    },
    {
        comment_date: 'November 21, 2023 8:30:00',
        comment_content: 'This is hilarious',
        user_id: 2,
        post_id: 2,
    },
    {
        comment_date: 'November 21, 2023 20:30:00',
        comment_content: 'Thanks for posting this.  I really enjoyed reading it.',
        user_id: 1,
        post_id: 3,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

