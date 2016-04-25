var express = require('express');
var path = require('path');

var toDoRouter = require('./toDo');

var router = express.Router();

router.get('/', function(request, response){
  var index = path.join(__dirname, '../public/views/index.html');
  response.sendFile(index);
});

router.use('/toDo', toDoRouter);

module.exports = router;
