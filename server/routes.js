// routes
var authRoute = require('./authRoute.js');
var gameRoute = require('./gameRoute.js');

module.exports = function(app, express) {

  app.post('/api/signin', authRoute.signin);
  app.post('/api/signup', authRoute.signup);

  app.get('/api/scores', gameRoute.getScores);
  app.post('/api/scores', gameRoute.updateScore);

}