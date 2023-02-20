const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use('/', require('./items.routes'))
router.use('/', require('./user.routes'))
router.use('/', require('./warranty.routes'))

module.exports = router;
