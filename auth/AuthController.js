var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');

router.post('/register', function(req, res) {
    if(!req.body.username || !req.body.email || !req.body.password){
      return res.status(403).send({message : "Username/Email/Password can't be empty"})
    }
    else{ 
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.findOne({'$or':[{username : req.body.username}, {email : req.body.email}]}, function(err, user){
        if (err) return res.status(500).send({message : "There was a problem registering the user."})
        if(user) return res.status(403).send({message : "Username / Email already exists"})
  
        User.create({
          username : req.body.username,
          email : req.body.email,
          password : hashedPassword,
          role : req.body.role == null ? 'user' : req.body.role,
          DOB : req.body.DOB
      },
      function (err, user) {
        if (err) return res.status(500).send({message : "There was a problem registering the user. Problem may be due to incorrect type of data in fields"})
        var token = jwt.sign({username : user.username, role : user.role}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ message : "User successfully registered",auth: true, token: token });
      }); 
    });

    }
   

    })
    



  router.post('/login', function(req, res) {
    userRole = req.body.role == null ? 'user' : req.body.role
    
    User.findOne({ username: req.body.username, role : userRole }, function (err, user) {
      if (err) return res.status(500).send({'message':'Error on the server.'});
      if (!user) return res.status(404).send({"token": null, "message" : "Not a registered user"});
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ message: "Invalid credentials", token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 
      });
      res.status(200).send({ message: 'success', token: token });
    });
  });


  module.exports = router;
