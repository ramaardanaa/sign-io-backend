const router = require('express').Router();

router.get('/', (req, res) => {
  res.send("room")
})

module.exports = router;
