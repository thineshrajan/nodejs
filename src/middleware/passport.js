const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Configure Passport with local strategy
passport.use(new LocalStrategy(async (email, password, done) => {
  try {
    const user = await User.findOne({ email ,status:{$ne:0}});
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
  
    if (!password == user.password) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false, { message: 'User not found.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
