const { Friend } = require('../models')

class FriendController {

  static findAll(req, res, next) {
    Friend.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err)
      })
  }

  static addFriend(req, res, next) {
    const idOwner = req.loginUser.id;
    const obj = {
      owner: idOwner,
      friend: req.body.friend
    }

    Friend.create(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteFriend(req, res, next) {
    const idFriend = +req.params.id;

    Friend.destroy({ where: {
      'id': idFriend
    }})
      .then(data => {
        res.status(200).json({name : data.name, msg : 'Room has been deleted'});
      })
      .catch(err => {
        res.status(500).json({msg: err.errors[0].message});
      })
  }

}

module.exports = FriendController