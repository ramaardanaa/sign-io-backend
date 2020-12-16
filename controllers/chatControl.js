const { Chat } = require('../models');

class ChatController {
  static add(req, res, next) {
    const data = {
      message: req.body.message,
      UserId: req.loginUser.id,
      RoomId: req.body.RoomId
    }

    Chat.create(data)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => next(err))
  }
}

module.exports = ChatController