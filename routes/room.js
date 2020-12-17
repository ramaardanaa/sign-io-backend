const RoomController = require('../controllers/roomControl');

const router = require('express').Router();

router.get('/', RoomController.findAll);
router.post('/', RoomController.addRoom);
router.delete('/:id', RoomController.deleteRoom);
router.get('/:id', RoomController.findOne)

module.exports = router;
