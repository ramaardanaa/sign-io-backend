const { comparePass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {

  static register(req, res, next){
    const obj = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(obj)
      .then(data => {
        res.status(201).json({ 
          'id' : data.id, 
          'email': data.email, 
        });
      })
      .catch(err => {
        // next({ msg : err, status : 500});
        res.status(500).json({err});
      })
  }

  static login(req, res, next){
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    if(!payload.email && !payload.password) {
      // next({ msg : 'email/password not null', status : 404});
      res.status(404).json({msg : 'email/password not null'});
    } else {
      User.findOne({
        where: {email : payload.email}
      })
        .then(data => {
          console.log(data);
          if(!data) {
            // next({ msg : 'wrong email/password', status : 401});   
            res.status(401).json({ msg : "wrong email/password"});
          } else if(!comparePass(payload.password, data.password)){
            // next({ msg : 'wrong email/password', status : 401});
            res.status(401).json({ msg : "wrong email/password"});
          } else {
            const access_token = signToken({
              id: data.id,
              email: data.email
            })
            // console.log(access_token, "<<<<<<<<<< acesstoken")
            res.status(200).json({ access_token : access_token, role : data.role });
          }
        })
        .catch(err => {
          res.status(500).json({err});
        })
    }
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
        res.status(500).json(err)
      })
  }
}

module.exports = UserController