var helper = require('./helpers.js');
var User = require('./userModel.js');

module.exports = {

  getScores: function(req, res) {

    // User.find({},{username:true, score:true},{"sort":"score", "limit":10})
    //   .toArray(function(err, data){
    //     console.log("DB DATA: ",data);
    //     if (err) {
    //       console.log("mongo find getScores err: ", err);
    //     } else {
    //       res.json(data);
    //     }
    //   });

      User.find({},{username:1, score:1})
      .sort({score: -1})
      .limit(10)
      .then(function(data){
        res.json(data);
      })
      // .fail(function(err){console.log("ERR: ", err)})
  },

  updateScore: function(req, res) {
    var newScore = req.body.points;
    var username = req.body.username;

    User.findOne({'username':username}, function(err, user){
      if (err) {
        console.log("mongo findOne updateScore err: ", err);
      } else {
        if (!user) {
          helper.sendError("Username not found", req, res);
        } else {
          if (newScore > user.score) {
            User.update({'username':username},{'score':newScore}, function(err, result){
              if (err) {
                console.log("mongo update updateScore err: ", err);
              } else {
                res.json(result);
              }
            });
          } else {
            res.json({score: user.score});
          }
        }
      }
    })
  }

};