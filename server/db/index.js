const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://default:cachemoney123@cluster0.0lql9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', console.log("Database Connected..."), { useNewUrlParser: true,  useUnifiedTopology: true }) 
    .catch(e => {
      console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;


