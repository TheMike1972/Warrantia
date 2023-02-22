const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')


// router.get('/signup', (req, res, next) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {

  const { username, email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        password: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/auth/login');
    })
    .catch(error => next(error));
});


router.get('/login', (req, res, next) => {
  res.render('auth/login')
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, username and password to login.'
    });
    return;
  }

  User.findOne({ username })
    .then(user => {
      console.log('user found: ', user)
      if (!user) {
        res.render('auth/login', { errorMessage: 'username is not registered. Try with other username.' });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        console.log('success')
        req.session.currentUser = user
        res.redirect('/profile')
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});


  router.get('/signup', isLoggedOut, (req, res, next) => {
    res.render('auth/signup')
  })
   
router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/login');
    });
npm })


module.exports = router;

