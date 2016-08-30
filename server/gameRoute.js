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

  updateScore: function(req, res) {}

};