const FriendController = require('../controllers/friendControl');

const router = require('express').Router();

router.get('/', FriendController.findAll);
router.post('/', FriendController.addFriend);
router.delete('/:id', FriendController.deleteFriend);

module.exports = router;
