const UserController = require('../controllers/userControl');
// const unggah = require('unggah')

// const upload = unggah({
//   limits: {
//     fileSize: 1e6 
//   },
//   storage: storage 
// })

// const storage = unggah.s3({
//   endpoint: 's3.ap-southeast-1.amazonaws.com',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   bucketName: 'sign-io',
//   rename: (req, file) => {
//     return `${Date.now()}-${file.originalname}`
//   }
// })

const router = require('express').Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.put('/edit/:id',
//  upload.single('file'),
UserController.update)

module.exports = router;
