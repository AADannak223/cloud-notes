 //Here we connect to mongoDB
 const mongoose = require('mongoose');
 const mongoURI = "mongodb://localhost:27017/cloudnotes"

 const connectToMongo = () => {
     mongoose.connect(mongoURI, () => {
         console.log("connected to mongo successfully");
     })
 }


 module.exports = connectToMongo