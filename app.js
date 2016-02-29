var
  express = require('express'),
  connect = require('connect'),
  data = require('./data/info');

var app = express();
app
  .use(connect.json())
  .all("/1/info/cdn", function(req,res){
    res.status(200)
      .set('Content-Type', 'application/json')
      .json(data.cdn);
  });

if(process.env.NODE_ENV !== 'UT'){
  app.listen(serverConfigs.port);
  console.log('Server listening on port ' + serverConfigs.port + ';  NODE_ENV: ' + process.env.NODE_ENV);
} else {// for unit test
  //db.set('debug', false);
  //log4js.configure({}, {});
  module.exports = app;
}