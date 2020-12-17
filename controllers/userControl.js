const { comparePass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {

  static register(req, res, next){
    const code = '#' + Math.random().toString(36).substr(2, 8)
    const obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_picture: `https://ui-avatars.com/api/?name=${req.body.name.trim()}&rounded=true&background=random`,
      unique_code: code
    }

    User.create(obj)
      .then(data => {
        res.status(201).json({ 
          id: data.id, 
          email: data.email, 
        });
      })
      .catch((errors) => {
        next(errors);
      });
  }

  static login(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };

    if(!payload.email && !payload.password) {
      next({ msg: 'email/password not null', status: 404 });
    } else {
      User.findOne({
        where: { email: payload.email },
      })
        .then(data => {
          if(!data) {
            throw ({ msg: 'wrong email/password', status: 401 });   
          } else if(!comparePass(payload.password, data.dataValues.password)){
            next({ msg: 'wrong email/password', status: 401 });
          } else {
            const access_token = signToken({
              id: data.dataValues.id,
              email: data.dataValues.email
            })
            console.log(data)
            res.status(200).json({
              id: data.id,
              name: data.name,
              profile_picture: data.profile_picture,
              access_token,
              unique_code: data.unique_code
            });
          }
        })
        .catch(errors => {
          next(errors)
        })
    }
  }

  static update(req, res, next){
    const idUser = req.loginUser.id
    const obj = {
      name: req.body.name,
      profile_picture: req.body.profile_picture,
    };

    User.update(obj, { where: {'id': idUser}})
      .then(data => {
        res.status(200).json({
          name: req.body.name,
          profile_picture: req.body.profile_picture
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController;
