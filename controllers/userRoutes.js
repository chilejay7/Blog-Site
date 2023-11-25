const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res) => {
    // console.log(req.headers);
    res.render('user');
    // res.send('User request received');
});

// Login route
router.post('/', async (req, res) => {
    console.log(`Username is: ${req.body.user_name} and the password is: ${req.body.password}`);

    const userData = await User.findOne({
        where: {
           user_name: req.body.user_name,
        }
    });

    // !userData ? res.status(400).json({message: 'User not found.  Please re-enter your credentials.'})
    console.log(userData);

     const validPassword = await userData.checkPassword(req.body.password);
     console.log(validPassword);

     if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }

    // This creates a session variable to show that the user is logged in.  The user_id is used as the identifier with a boolean.
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200);
    });

    console.log(req.session.user_id);

    res.redirect('/');
});

// Create new user route
router.post('/create', async (req, res) => {
    const userData = await User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    });
    
    res.redirect('/');
})

module.exports = router;