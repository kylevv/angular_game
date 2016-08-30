// Start server

// get dependencies
var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./server/middleware.js');
var routes = require('./server/routes.js');



// assign port
var port = process.env.PORT || 1337;

// create app w/ express
var app = express();

// start database
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/jqss'

mongoose.connect(mongoURI);

// configure middleware and routes
middleware(app, express);
routes(app, express);

// start listening
app.listen(port);

console.log('Server now listening on port ' + port);

module.exports = app;