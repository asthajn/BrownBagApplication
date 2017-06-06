var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var index = require('./routes/index');
var brownBag = require('./routes/brownBag.js');
var Names = require('./routes/names.js');
var Download = require('./routes/download.js');

var app = express();

app.use(bodyParser.json());
app.use('/', index);
app.use('/brownBag', brownBag);
app.use('/names', Names);

app.use('/download', Download);
//app.get('/download', )
app.use(express.static(path.join(__dirname, 'public')));

var templates = app.set('templates', path.join(__dirname, 'templates'));

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
module.exports = app;