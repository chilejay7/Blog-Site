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
// When the route was used with only /:id, no additional GET routes could be defined.  All values after the / were being interpreted as id's.
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

    // This is used to serialize the data so that it only includes the data that we need
    const comments = commentsOnPost.map(c => c.get({ plain: true }));
    console.log(comments);
    console.log(`The post retrieved from the database query is: ${posts}`);

    res.render('postById', {
        posts,
        comments,
        loggedIn: req.session.loggedIn,
    })
});

// GET route to provide the template to add a post to the site.
// This route is called through the "Add a Post" button in the nav bar when logged in.
router.get('/add', (req, res) => {
    res.render('post_add', {
        loggedIn: req.session.loggedIn,
    });
})

// This route is called from the form embedded within the post_add.handlebars view.
// On submit the action attribute creates a POST request to the route.
// The fields needed for the database are submitted using the form fields' name attributes.
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

});

// The request for this route is made from within the post_update.js file.
// An event listener on the update button triggers the request.
// A render or redirect is not needed in the response.  This is done from within the post_update.js file that makes the initial request.
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const{ post_title, post_content } = req.body;
    console.log(`This is the id:${id}`);

    const updatedPost = await Post.update({
        title: post_title,
        post_content,
    },
    {
        where: {
            id,
        },
    },
    )

    res.status(200).json(updatedPost);
});

router.delete('/:id', async (req, res) => {
    console.log(req);
    const { id } = req.params; 
    const deletePost = await Post.destroy({
        where: {
            id,
        }
    });

    res.status(200).json('The post has been removed.')
})

module.exports = router;