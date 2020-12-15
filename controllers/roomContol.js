const { Room } = require('../models')

class RoomController {

  static findAll(req, res, next){
    Room.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
        // next(err);
      })
  }

  static addRoom(req, res, next){
    const idUser = req.loginUser.id;
    const obj = {
      name: req.body.name,
      UserId: idUser
    }

    Room.create(obj)
      .then(data => {
        res.status(201).json({
          id: data.id,
          name: data.name,
          UserId: data.UserId
        })
      })
      .catch(err => {
        // next({ msg : err, status : 500});
        res.status(500).json({err});
      })
  }

  static deleteRoom(req, res, next) {
    const idRoom = +req.params.id;

    Room.destroy({ where : {
      'id': idRoom
    }})
      .then(data => {
        res.status(200).json({name : data.name, msg : 'Room has been deleted'});
      })
      .catch(err => {
        res.status(500).json({msg: err.errors[0].message});
        // next(err)
      })

  }
}

module.exports = RoomController