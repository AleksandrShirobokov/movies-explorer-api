const router = require('express').Router();
const {
  patchUser, getCurrentUser,
} = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validationCheck');

router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidation, patchUser);

module.exports = router;
