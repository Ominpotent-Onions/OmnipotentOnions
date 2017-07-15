const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });


// router.route('/login')
//   .post(middleware.passport.authenticate('local-login', {
//     successReturnToOrRedirect: '/connections',
//     failureRedirect: '/login',
//     failureFlash: true,
//   }));

// router.route('/signup')
//   .post(middleware.passport.authenticate('local-signup', {
//     successReturnToOrRedirect: '/connections',
//     failureRedirect: '/signup',
//     failureFlash: true,
// }));

router.route('/login')
  .get((req, res) => {
    // res.render('login.ejs', { message: req.flash('loginMessage') });
    res.render('login.ejs');
    // res.render('login.ejs', { message: 'hello, world' });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });


router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/api/main',
  failureRedirect: '/login'
}));

// router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
//   scope: ['public_profile', 'email']
// }));

// router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

// router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

// router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// }));

module.exports = router;
