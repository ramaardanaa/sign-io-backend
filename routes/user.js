const UserController = require('../controllers/userControl');

const router = require('express').Router();

router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router;
