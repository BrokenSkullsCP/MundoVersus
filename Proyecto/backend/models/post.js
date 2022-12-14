const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {type: String, require:true},
  content: {type: String, require: true},
  pares: {type: String, require: true},
  process: {type: String, require: true},
  style: {type: String, require: true},
  corrida: {type: String, require: true},
});

module.exports = mongoose.model('Post', postSchema);
