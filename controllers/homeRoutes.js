const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    // console.log(postData);
    const posts = postData.map(post => post.get({ plain: true }));
    // console.log(posts);
    res.render('homepage', { 
        posts,
        // This value needs to be included in the object passed to each page in order to properly evaluate a user's session and login state.
        loggedIn: req.session.loggedIn, 
    });
});

module.exports = router;