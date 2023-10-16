const mongoose = require("mongoose");
require('dotenv').config();

//MongoDb Database Connectivty
 const dbconnect =  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB Atlas');
        // await insertData(); // Call your function to insert data here
    })
    .catch(error => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

module.exports = dbconnect;
     