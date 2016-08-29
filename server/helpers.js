

module.exports = {

  findUser: function(username, callback) {

  },

  sendError: function(error, req, res) {
    res.send(500, {error: error});
  }

};