var mongoose = require('mongoose')
var mongoDb = 'mongodb://localhost/streak'
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose.connection
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
  mongoose.connection.once("open", function () {
    console.log("database connection established successfully");
  });