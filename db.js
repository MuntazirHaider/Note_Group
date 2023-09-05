const mongoose = require('mongoose');
// simply connected to mongo
const connectedToMongo = () => {mongoose.connect('mongodb://127.0.0.1:27017/NOTE_GROUP')};


module.exports = connectedToMongo;