const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// router.get('/', (req, res) => {
//     console.log(req);
//     const commentData = Comment.findAll();
//     res.send('Comment request received.');
// });


// This route receives POST requests from the comments box built-into the postById view.
router.post('/:id', async (req, res) => {
    const { user_id } = req.session;
    const { comment_content } = req.body;

    // This is used to identify the post.  The id from the post is added as a variable in url in the postById handlebars file.
    // The request is triggered through the comment form on submit from postById view.
    const { id } = req.params;

    const newComment = await Comment.create({
        comment_content,
        user_id,
        post_id: id,
    })
    
    console.log(`The user's id leaving the comment is ${user_id} and the comment is: ${comment_content}`);


    res.status(200).redirect(`/api/posts/byId/${id}`);
})

module.exports = router;