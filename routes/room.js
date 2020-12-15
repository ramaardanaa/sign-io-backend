const RoomController = require('../controllers/roomControl');

const router = require('express').Router();

router.get('/', RoomController.findAll);
router.post('/', RoomController.addRoom);
router.delete('/:id', RoomController.deleteRoom);

module.exports = router;
