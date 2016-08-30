var helper = require('./helpers.js');
var User = require('./userModel.js');

module.exports = {

  getScores: function(req, res) {
    // User.find({},{username:1, score:1})
    User.find({},{username:true, score:true},{"sort":["score","desc"], "limit":10})
      .toArray(function(err, data){
        console.log("DB DATA: ",data);
        if (err) {
          console.log("mongo find getScores err: ", err);
        } else {
          res.json(data);
        }
      });

      // .sort({score: -1})
      // .limit(10)
      // .then()
      // .fail()
  },

  updateScore: function(req, res) {}

};