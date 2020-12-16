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
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static addFriend(req, res, next) {
    const idOwner = req.loginUser.id;
    const obj = {
      owner: idOwner,
      contact: req.body.contact
    }

    Friend.create(obj)
      .then(data => {
        const payload = {
          owner: req.body.contact,
          contact: idOwner
        }
        return Friend.create(payload)
      })
      .then(data2 => {
        res.status(201).json(data2)
      })
      .catch(err => {
        console.log(err)
        next(err);
      })
  }

  static deleteFriend(req, res, next) {
    const idFriend = +req.params.id;

    Friend.destroy({ where: {
      [Op.and]: [{ contact: idFriend }, { owner: req.loginUser.id }]
    }})
      .then(data => {
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