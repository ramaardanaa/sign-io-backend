const MemberController = require('../controllers/memberControl');

const router = require('express').Router();

router.get('/', MemberController.findAll);
router.post('/', MemberController.addMember);
router.delete('/:id', MemberController.deleteMember);

module.exports = router;
