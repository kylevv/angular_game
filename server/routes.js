// routes
var authRoute = require('./authRoute.js');

module.exports = function(app, express) {

  app.get('/api/signin', authRoute.signin);
  app.post('/api/signin', authRoute.signup);

}