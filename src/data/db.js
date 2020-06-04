var mongoose = require('mongoose')
var mongoDb = 'mogodb://localhost:3000/streak'
mongoose.connect(mongoDb, { useNewUrlParser: true });
module.exports = mongoose.connection