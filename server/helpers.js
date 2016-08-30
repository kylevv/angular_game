

module.exports = {

  findUser: function(username, callback) {

  },

  sendError: function(error, req, res) {
    res.status(500).send({error: error});
  }

};