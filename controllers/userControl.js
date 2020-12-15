const { comparePass } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const unggah = require('unggah')

const upload = unggah({
  limits: {
    fileSize: 1e6 
  },
  storage: storage 
})

const storage = unggah.s3({
  endpoint: 's3.ap-southeast-1.amazonaws.com',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: 'sign-io',
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`
  }
})

class UserController {

  static register(req, res, next){
    const obj = {
      name: req.body.name,
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
      .catch(errors => {
        next(errors);
      })
  }

  static login(req, res, next){
    const payload = {
      email: req.body.email,
      password: req.body.password
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