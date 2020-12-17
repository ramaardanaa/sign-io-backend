const router = require("express").Router();
const userRoute = require("./user");
const roomRoute = require("./room");
const memberRoute = require("./member");
const friendRoute = require("./friend");
const speechRoute = require("./speech");
const signRoute = require("./sign");
const chatRoute = require("./chat")
const authentication = require("../middlewares/authentication");

router.use("/speech", speechRoute);
router.use("/sign", signRoute);
router.use("/users", userRoute);
router.use(authentication);
router.use("/rooms", roomRoute);
router.use("/members", memberRoute);
router.use("/friends", friendRoute);
router.use("/chats", chatRoute)

module.exports = router;
