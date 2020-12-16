const { Member } = require('../models')

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
    const obj = {
      UserId: req.body.UserId,
      RoomId: req.body.RoomId
    }

    Member.create(obj)
      .then(data => {
        res.status(201).json(data);
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