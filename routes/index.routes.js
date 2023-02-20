const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use('/', require('./items.routes'))
// router.use('/', require('./users.routes'))
// router.use('/', require('./warranties.routes'))

module.exports = router;
