const router = require('express').Router();

router.get('/', (req, res) => {
  res.send("member")
})

module.exports = router;
