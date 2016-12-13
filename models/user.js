var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
  role: String, // for authorizing user or admin
});

// plugin adds username, and creates salt for password
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);