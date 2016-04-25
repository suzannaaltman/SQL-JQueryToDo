var express = require('express');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;

var router = express.Router();

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      var query = client.query('SELECT id, item, completed FROM toDo');
      var results = [];
      console.log('hello from the toDo router');

      query.on('row', function(row){
        results.push(row);
        console.log('row:', row);
      });

      query.on('end', function(){
        done();
        response.send(results);
      });

      query.on('error', function(error){
        console.log('Error running query', error);
        done();
        response.sendStatus(500);
      });
    }
  })
});

router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      var item = request.body.item;
      console.log('item:', item);
      var query = client.query('INSERT INTO toDo (item) VALUES ($1)', [item]);

      query.on('end', function(){
        done();
        response.sendStatus(200);
      });

      query.on('error', function(error){
        console.log('Error running query', error);
        done();
        response.sendStatus(500);
      });
    }
  });
});

// router.put('/:id', function(request, response){
//   var id = request.params.id;
//   var completed = request.body.completed;
//   pg.connect(connectionString, function(err, client, done){
//     var query = client.query('UPDATE toDo SET completed = ' + completed + 'WHERE id = ' + id + ';');
//
//     query.on('end', function(){
//       done();
//       response.send(results);
//     });
//
//     query.on('error', function(err){
//       console.log(err);
//       done();
//       response.sendStatus(500);
//     });
//   });
// });

// router.delete('/:id', function(request, response){
//   var id = request.params.id;
//   pg.connect(connectionString, function(err, client, done){
//     var query = client.query('DELETE toDo WHERE id = ' + id + ';');
//
//     query.on('end', function(){
//       done();
//       response.sendStatus(200);
//     });
//
//     query.on('error', function(err){
//       console.log(err);
//       done();
//       console.log('deleted item id:', id);
//       response.sendStatus(500);
//     });
//   });
// });


module.exports = router;
