var mongoose = require('mongoose');
//create a schema
var brownBagSchema = new mongoose.Schema({
  name: "string",
  preferred: "string",
  option: "string"
});

var BrownBag = mongoose.model('brownBag', brownBagSchema);

module.exports = BrownBag;