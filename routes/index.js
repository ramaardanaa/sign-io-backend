const router = require("express").Router();
const userRoute = require("./user");
const roomRoute = require("./room");
const memberRoute = require("./member");
const friendRoute = require("./friend");
const speechRoute = require("./speech");
const authentication = require("../middlewares/authentication");

router.use("/speech", speechRoute);
router.use("/users", userRoute);
router.use(authentication);
router.use("/rooms", roomRoute);
router.use("/members", memberRoute);
router.use("/friends", friendRoute);

module.exports = router;
