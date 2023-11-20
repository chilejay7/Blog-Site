const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

exports.router = router;

