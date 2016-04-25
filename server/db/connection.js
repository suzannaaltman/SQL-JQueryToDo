var pg = require('pg');

var connectionString = '';

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/todolist';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connecting to DB', err);
    }else{
      var toDoList = 'CREATE TABLE IF NOT EXISTS toDo (id SERIAL PRIMARY KEY, item VARCHAR(120), completed BOOLEAN DEFAULT false);';
      var query = client.query(toDoList);

      query.on('end', function(){
        console.log('Sucessfully created schema or ensured schema exists');
        done();
      });

      query.on('error', function(){
        console.log('Error creating schema');
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
