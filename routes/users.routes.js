const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.render('users/user-profile');
});



module.exports = router