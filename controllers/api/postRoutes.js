const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    console.log(req.session);
    const posts = postData.map(post => post.get({ plain: true }));
    console.info(req.session.loggedIn);
    res.render('posts', { 
        posts,
        loggedIn: req.session.loggedIn,
    });
});

// GET route to view a specific post and its related comments.  The route's url had to be updated to include 'byId'.
// When the route was used with only /:id, no additional routes could be defined.  All values after the / were being interpreted as id's.
// The id is inserted into the route's url within the posts.handlebars views file.
router.get('/byId/:id', async (req, res) => {
    console.info(`The request is: ${req.params.id}`);
    const { id } = req.params;
    console.log(`The id retrieved from the request is: ${id}`);
    const postId = await Post.findByPk(id, {
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

    // findAll returns an array which is needed to allow the views for each statement to loop over it.  findOne returns an object which will throw errors.
    const commentsOnPost = await Comment.findAll({
        where: {
            post_id: id,
        },
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

    const posts = postId.get({ plain: true });
    const comments = commentsOnPost.map(c => c.get({ plain: true }));
    console.log(comments);
    console.log(`The post retrieved from the database query is: ${posts}`);

    res.render('postById', {
        posts,
        comments,
        loggedIn: req.session.loggedIn,
    })
});

// GET route to provdie the template to add a post to the site.
router.get('/add', (req, res) => {
    res.render('post_add', {
        loggedIn: req.session.loggedIn,
    });
})

router.post('/add', async (req, res) => {
    console.log(req.body);
    // console.dir(`Session Information: ${req.session}`);
    const { post_title, post_content } = req.body;
    const { user_id } = req.session;
    console.log(`The user's id is: ${user_id}`);
    const newPost = await Post.create({
        title: post_title,
        post_content,
        user_id,
    });

    res.status(200).redirect('/api/posts');

})

module.exports = router;