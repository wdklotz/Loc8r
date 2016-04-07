var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// new model instance
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

// save hash to model instance
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

//  use the data from the current user model to create a unique JWT and return it
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7)  //Create expiry date object and set for seven days

  return jwt.sign ({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)  // Unix time in seconds
  }, process.env.JWT_SECRET); //Send secret for hashing algorithm to use
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

// compile the model
var User = mongoose.model('User', userSchema);
