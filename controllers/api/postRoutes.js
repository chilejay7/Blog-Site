const router = require('express').Router();
const { Post } = require('../../models/index');

router.get('/', async (req, res) => {
    // console.log(req);
    const postData = await Post.findAll();
    console.log(postData);
    const posts = postData.map(post => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { posts });
});

module.exports = router;