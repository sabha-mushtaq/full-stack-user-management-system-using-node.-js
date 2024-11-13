const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


// connecting to database
const connecttodatabase = () => {
  const mongoUrl =  process.env.MY_DATABASE

  mongoose.connect(mongoUrl, {
   
    connectTimeoutMS: 30000,  // 30 seconds timeout
    socketTimeoutMS: 30000   // 30 seconds socket timeout
  })
  .then((conn) => console.log(`Connected to Database: ${conn.connection.host}`))
  .catch((err) => console.log(`Error: ${err.message}`));
}

module.exports = connecttodatabase;
