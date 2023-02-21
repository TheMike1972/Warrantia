const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.render('users/user-profile', { userInSession: req.session.currentUser });
  });



  module.exports = router