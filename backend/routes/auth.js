const bcrypt = require('bcryptjs')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('../models/user')
const express = require('express');
const router = express.Router()

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

router.use(passport.authenticate('session'));

passport.use(new LocalStrategy(
  { usernameField: 'name' }, 
  async (name, password, done) => {
    try {
      const user = await User.findOne({ name });
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); 
    }
    if (!user) {
      return res.status(400).json({ message: info.message }); 
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('logged in')
      return res.json({message: 'Logged in', user});
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
      try {
      const { name, password } = req.body;
      const user = new User({ name, password });
      await user.save();
  
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
     }
  });

router.get('/check', (req, res) => {
    if (req.isAuthenticated()) {
      console.log('triggered the /auth/check')
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false });
    }
  });

module.exports = router 