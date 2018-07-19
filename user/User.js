var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: {type : String, min : 6},
  email: {type : String, min : 6},
  password: String,
  role : String,
  DOB : Date,
  attempts : Number
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');