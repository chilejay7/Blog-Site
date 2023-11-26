const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    // console.log(req);
    const postData = await Post.findAll();
    // console.log(postData);
    console.log(req.session);
    const posts = postData.map(post => post.get({ plain: true }));
    // console.log(posts);
    console.info(req.session.loggedIn);
    res.render('posts', { 
        posts,
        loggedIn: req.session.loggedIn,
    });
});

router.get('/:id', async (req, res) => {
    console.info(`The request is: ${req.params.id}`);
    const { id } = req.params.id;
    console.log(`The id retrieved from the request is: ${id}`);
    const postId = await Post.findByPk(req.params.id, {
       include: [
        {
            model: User,
            attributes: [
                'id',
                'user_name',
            ],
        },
       ],
    });

    // findAll returns an array which is needed to allow the views for each to loop over it.  findOne returns an object.
    const commentsOnPost = await Comment.findAll({
        where: {
            post_id: req.params.id,
        }
    });

    // console.log(postId);

    // const postEdit = postId.map(post => post.get({ plain: true }));
    const postEdit = postId.get({ plain: true });
    const comments = commentsOnPost.map(c => c.get({ plain: true }));
    console.log(comments);
    console.log(`The post retrieved from the database query is: ${postEdit}`);

    res.render('updatePost', {
        postEdit,
        comments,
        loggedIn: req.session.loggedIn,
    })
})

module.exports = router;