var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var app = express();


var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/brownBagApp')
.then(function(){
  console.log("connection to mongo successful");
}).catch(function(err){
  console.log(err);
})

var brownBag = require('./routes/brownBag.js');
app.use('/brownBag', brownBag);

var Names = require('./routes/names.js');
app.use('/names', Names);
var index = require('./routes/index');
var templates = app.set('templates', path.join(__dirname, 'templates'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

module.exports = app;