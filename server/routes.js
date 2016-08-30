// routes
var authRoute = require('./authRoute.js');

module.exports = function(app, express) {

  app.post('/api/signin', authRoute.signin);
  app.post('/api/signup', authRoute.signup);

}