// handle signin/signout requests

var Q = require('q');
var jwt = require('jwt-simple');
var helper = require('helpers.js');

module.exports = {
  signin: function(req, res) {
    var username = req.body.user;
    var password = req.body.password;
    // check db for user
    helper.findUser(username, function(user){
      if(!user) {
        helper.sendError("No user found", req, res);
      } else {
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
    })
  },

  signup: function(req, res) {

    var token = jwt.encode(user, 'shhhh');
    res.json({token: token});
  }

  signout: function(req, res) {
    res.json({});
  }
}