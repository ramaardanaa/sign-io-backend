const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication (req, res, next) {
  const { access_token } = req.headers;
  // console.log('error di authen kena di try');

  try {
    if(!access_token){
      res.status(401).json({msg : 'Authentication Failed'});
      // throw { msg : 'Authentication Failed', status : 401};
    } else {
      const decoded = verifyToken(access_token);
      const user = await User.findOne({
        where: {email : decoded.email}
      })

      if(!user){
        res.status(401).json({msg : 'Authentication Failed'});
        // throw { msg : 'Authentication Failed', status : 401};
      } else {
        req.loginUser = decoded;
        next()
      }
    }
  } catch (error) {
    console.log(error, 'error catch')
    next(error);
  }
}

module.exports = authentication