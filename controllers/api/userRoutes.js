const router = require('express').Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    console.log(req);
    res.send('User request received.')
});

module.exports = router;