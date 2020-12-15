const router = require('express').Router()
const ChatController = require('../controllers/chatControl')

router.post('/', ChatController.add)

module.exports = router