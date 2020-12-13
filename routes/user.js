const UserController = require('../controllers/userControl');

const router = require('express').Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.put('/edit/:id', UserController.update)

module.exports = router;
