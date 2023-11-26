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
    console.info(`The request is: ${req.params}`);
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
        {
            model: Comment,
            attributes: [
                'id',
                'comment_date',
                'comment_content',
                'user_id',
                'post_id',
            ],
        },
       ],
    });

    // const postEdit = postId.map(post => post.get({ plain: true }));
    const postEdit = postId.get({ plain: true });
    console.log(`The post retrieved from the database query is: ${postEdit.post_content}`);

    res.render('updatePost', {
        postEdit,
        loggedIn: req.session.loggedIn,
    })
})

module.exports = router;