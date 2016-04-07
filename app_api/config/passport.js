var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
// console.log(User);

passport.use(
  new LocalStrategy( {usernameField: 'email'},
    function(username, password, done) {
      // console.log('username: ',username);
      User.findOne({email: username}, function(err, user) {
        if(err)   return done(err);
        if(!user) return done(null, false, { message: 'No such user.' });
        if(!user.validPassword(password)) return done(null, false, { message: 'Wrong password.' });
      return done(null, user);
      });
    }
));
