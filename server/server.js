var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var dbConnection = require('./db/connection');

var app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

dbConnection.initializeDB();

var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port, '. Use ctrl-c to exit.');
});
