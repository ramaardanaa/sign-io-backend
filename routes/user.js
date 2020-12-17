const UserController = require('../controllers/userControl');
const unggah = require('unggah')
const authentication = require("../middlewares/authentication");

/* istanbul ignore next */
const storage = unggah.s3({
  endpoint: 's3.ap-southeast-1.amazonaws.com',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: 'sign-io',
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`
  }
})

/* istanbul ignore next */
const upload = unggah({
  limits: {
    fieldSize: 8 * 1024 * 1024
  },
  storage: storage 
})

const router = require("express").Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.put('/edit', authentication, UserController.update)
/* istanbul ignore next */
router.post('/upload-picture', upload.single('file'), (req, res, next) => {
  res.status(201).json({
    file: req.body.file
  })
})

module.exports = router;
