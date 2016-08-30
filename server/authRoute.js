// handle signin/signout requests

var Q = require('q');
var jwt = require('jwt-simple');
var helper = require('./helpers.js');
var User = require('./userModel.js');

module.exports = {
  signin: function(req, res) {
    console.log("signin: ", req.body);
    var username = req.body.username;
    var password = req.body.password;
    // check db for user
    User.findOne({'username':username}, function(err, user){
      if (err) {
        console.log("mongo findOne signin err: ", err);
      } else {
        if(!user) {
          helper.sendError("No user found", req, res);
        } else {
          console.log("USER: ",user);
          user.comparePassword(password, function(err, match){
            if (!match) {
              helper.sendError("Password invalid", req, res);
            } else {
              //add jwt
              var token = jwt.encode(user, 'shhhh');
              //send to games
              res.json({token: token});
            }
          })
        }
      }
    })
  },

  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({'username':username}, function(err, user){
      if (err) {
        console.log("mongo findOne signup err: ", err);
      } else {
        if (user) {
          helper.sendError("Username taken", req, res);
        } else {
          User.create({
            'username': username,
            'password': password,
            'score': 0
          }, function(err, user){
            if (err) {
              console.log("mongo create err: ", err);
            } else {
              var token = jwt.encode(user, 'shhhh');
              res.json({token: token});
            }
          });
        };
      };
    });
  },

  signout: function(req, res) {
    res.json({});
  }
}