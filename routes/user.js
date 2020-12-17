const UserController = require("../controllers/userControl");
const unggah = require("unggah");
const authentication = require("../middlewares/authentication");

const storage = unggah.s3({
  endpoint: "s3.ap-southeast-1.amazonaws.com",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: "sign-io",
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`;
  },
});

const upload = unggah({
  limits: {
    fileSize: 1e6,
  },
  storage: storage,
});

const router = require("express").Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.put("/edit", authentication, UserController.update);
router.post("/upload-picture", upload.single("file"), (req, res, next) => {
  console.log("req body", req.body);
  console.log("berhasil", req.body.file);
  res.status(201).json({
    file: req.body.file,
  });
});

module.exports = router;
