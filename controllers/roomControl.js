const { Room, Member, User } = require('../models')

class RoomController {

  static async findAll(req, res, next){
    try {
      const option = {
        where: {
          UserId: req.loginUser.id
        },
        include: [Room]
      }
      const RoomsData = await Member.findAll(option)
      const Rooms = RoomsData.map(el => {
        return el.Room
      })
      res.status(200).json(Rooms)
    } catch (error) {
      next(error)
    }
  }

  static async addRoom(req, res, next){
    try {
      const idUser = req.loginUser.id;

      // create room
      const code = Math.random().toString(36).substr(2, 8)
      const obj = {
        name: req.body.name,
        UserId: idUser,
        code
      }
      const newRoom = await Room.create(obj)

      // create member of the room
      const memberData = {
        RoomId: newRoom.id,
        UserId: idUser
      }
      const newMember = await Member.create(memberData)  
      
      // response
      res.status(201).json({
        id: newRoom.id,
        name: newRoom.name,
        code: newRoom.code
      })
    } catch (error) {
      next(error)
    }
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
        next(err)
      })
  }

  static findOne(req, res, next) {
    const idRoom = +req.params.id;
    const option = {
      where: {
        id: idRoom
      },
      include: [{
        model: Member,
        include: [User]
      }]
    }
    Room.findOne(option)
      .then(data => {
        const members = data.Members.map(member => {
          return member.User
        })
        const response = {
          id: data.id,
          name: data.name,
          members
        }
        res.status(200).json(response)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = RoomController