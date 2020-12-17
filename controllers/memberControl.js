const { Member, Room } = require('../models')

class MemberController {

  static findAll(req, res, next){
    Member.findAll()
      .then(data => {
        if(req.body.bug){
          throw { msg: "data null", status: 400 }
        }
        res.status(200).json(data);
      })
      .catch(errors => {
        next(errors);
      })
  }

  static addMember(req, res, next){
    const option = {
      where: {
        code: req.body.code
      }
    }
    Room.findOne(option)
      .then(data => {
        const obj = {
          UserId: req.loginUser.id,
          RoomId: data.id
        }
        return Member.create(obj)
      })
      .then(data2 => {
        res.status(201).json(data2);
      })
      .catch(errors => {
        next(errors);
      })
  }

  static deleteMember(req, res, next){
    const idMember = +req.params.id;

    Member.destroy({ where : {
      'id': idMember
    }})
      .then(data => {
        res.status(200).json({ msg : 'Delete Success'});
      })
      .catch(errors => {
        next(errors);
      })
  }
}

module.exports = MemberController