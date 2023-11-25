const { Post } = require('../models');

// The data populated corresponds to the fields defined in the Post model.
const postData = [
    {
        title: 'My First Post',
        post_date: 'November 19, 2023 8:00',
        post_content: 'This is the first test post I have ever created.',
        user_id: 1,
    },
    {
        title: 'Second Post',
        post_date: 'November 20, 2023 23:00',
        post_content: `Wow, I created another post.  I can't believe it.`,
        user_id: 1,
    },
    {
        title: `Test User 2's post`,
        post_date: 'November 19, 2023 20:00',
        post_content: `Our second test user decided to create a post.  This is his first attempt at creating a post`,
        user_id: 2,
    },

    
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;