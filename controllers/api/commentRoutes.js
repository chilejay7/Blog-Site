const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    console.log(req);
    const commentData = Comment.findAll();
    res.send('Comment request received.');
});

module.exports = router;