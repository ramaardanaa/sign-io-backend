const { comparePass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {

  static register(req, res, next){
    const obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_picture: `https://ui-avatars.com/api/?name=${req.body.name.trim()}&rounded=true&background=random`
    }

    User.create(obj)
      .then(data => {
        res.status(201).json({ 
          id: data.id, 
          email: data.email, 
        });
      })
      .catch(errors => {
        next(errors);
      })
  }

  static login(req, res, next){
    const payload = {
      email: req.body.email,
      password: req.body.password
    }

    if(!payload.email && !payload.password) {
      next({ msg : 'email/password not null', status : 404});
    } else {
      User.findOne({
        where: {email : payload.email}
      })
        .then(data => {
          if(!data) {
            next({ msg : 'wrong email/password', status : 401});   
          } else if(!comparePass(payload.password, data.dataValues.password)){
            next({ msg : 'wrong email/password', status : 401});
          } else {
            const access_token = signToken({
              id: data.dataValues.id,
              email: data.dataValues.email
            })
            res.status(200).json({
              id: data.id,
              name: data.name,
              profile_picture: data.profile_picture,
              access_token
            });
          }
        })
        .catch(err => {
          next(err)
        })
    }
    
    User.findOne({
      where: {email : payload.email}
    })
      .then(data => {
        if(!data) {  
          throw { msg: 'Wrong email or password', status: 401 }
        } else if(!comparePass(payload.password, data.password)){
          throw { msg: 'Wrong email or password', status: 401 }
        } else {
          const access_token = signToken({
            id: data.dataValues.id,
            email: data.dataValues.email
          })
          res.status(200).json({ access_token : access_token });
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next){
    const idUser = req.params.id;
    const obj = {
      name: req.body.name,
      profile_picture: req.body.profile_picture
    }

    User.update(obj, { where: {'id': idUser}})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController