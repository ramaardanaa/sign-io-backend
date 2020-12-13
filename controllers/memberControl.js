const { Member } = require('../models')

class MemberController {

  static findAll(req, res, next){
    Member.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
        // next(err);
      })
  }

  static addMember(req, res, next){
    const obj = {
      UserId: req.body.UserId,
      RoomId: req.body.RoomId
    }

    Member.create(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
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
      .catch(err => {
        res.status(500).json({msg: err.errors[0].message})
        // next(err)
      })
  }
}

module.exports = MemberController