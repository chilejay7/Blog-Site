const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    // console.log(req.headers);
    res.render('user');
    // res.send('User request received');
});

router.post('/', async (req, res) => {
    console.log(`Username is: ${req.body.user_name} and the password is: ${req.body.password}`);
    const userData = await User.findOne({
        where: {
           user_name: req.body.user_name,
        }
    });

    console.log(userData);

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({user: userData, message: "You are logged in."});
    });

    res.redirect('/');
});

module.exports = router;