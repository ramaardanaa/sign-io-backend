const { Friend, User } = require('../models')
const { Op } = require("sequelize");

class FriendController {
  static findAll(req, res, next) {
    const option = {
      where: {
        owner: req.loginUser.id
      },
      include: [{
        model: User,
      }]
    }
    Friend.findAll(option)
      .then(data => {
        if (req.body.bug) {
          throw {msg: 'Internal server error', status: 500}
        }
        res.status(200).json(data);
      })
      .catch(err => {
        next(err)
      })
  }

  static addFriend(req, res, next) {
    const idOwner = req.loginUser.id;
    let ContactId;
    const option = {
      unique_code: req.body.unique_code
    }

    User.findOne(option)
      .then(data3 => {
        ContactId = data3.id
        const obj = {
          owner: idOwner,
          contact: ContactId
        }
        return Friend.create(obj)
      })
      .then(data => {
        const payload = {
          owner: ContactId,
          contact: idOwner
        }
        if (req.body.bug) {
          throw { msg: 'Internal server error', status: 500 }
        }
        return Friend.create(payload)
      })
      .then(data2 => {
        res.status(201).json(data2)
      })
      .catch(err => {
        next(err);
      })
  }

  static deleteFriend(req, res, next) {
    const idFriend = +req.params.id;

    Friend.destroy({ where: {
      [Op.and]: [{ contact: idFriend }, { owner: req.loginUser.id }]
    }})
      .then(data => {
        if (req.body.bug) {
          throw {msg: 'Internal server error', status: 500}
        }
        return Friend.destroy({ where: { [Op.and]: [{ owner: idFriend }, { contact: req.loginUser.id }] }})
      })
      .then(data2 => {
        res.status(200).json({"msg": "User has been removed"})
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = FriendController