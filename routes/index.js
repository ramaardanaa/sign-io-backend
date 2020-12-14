const router = require('express').Router();
const userRoute = require('./user');
const roomRoute = require('./room');
const memberRoute = require('./member');
const authentication = require('../middlewares/authentication');

router.use('/users', userRoute);
router.use(authentication)
router.use('/rooms', roomRoute);
router.use('/members', memberRoute);

module.exports = router;
