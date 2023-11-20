const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req);
    res.send('Post request received.')
});

module.exports = router;