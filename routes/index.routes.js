const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./../middleware/route-guard')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.use('/auth', require('./auth.routes'))

router.use(isLoggedIn)

router.use('/items', require('./items.routes'))
router.use('/profile', require('./users.routes'))
router.use('/', require('./warranties.routes'))

module.exports = router;
