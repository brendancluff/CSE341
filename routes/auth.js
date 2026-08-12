const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure'
  }),
  (req, res) => {
    res.status(200).json({
      message: 'Login successful',
      user: req.user
    });
  }
);

router.get('/failure', (req, res) => {
  res.status(401).json({
    message: 'Login failed'
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: req.user
    });
  }

  return res.status(200).json({
    authenticated: false
  });
});

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy(() => {
      res.status(200).json({
        message: 'Logout successful'
      });
    });
  });
});

module.exports = router;
