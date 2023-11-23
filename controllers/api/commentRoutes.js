const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req);
    res.send('Comment request received.');
});

module.exports = router;