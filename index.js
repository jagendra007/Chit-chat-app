
const express = require("express");
const app = express();
const http  = require("http");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const server = http.createServer(app)
const userRouter = require("./routes/user");
const createServer = require("./socket/socketio");
require('dotenv').config();

const port = 3000;
createServer(server);
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MongoDb Database Connectivty
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB Atlas');
        // await insertData(); // Call your function to insert data here
    })
    .catch(error => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });


app.use(
    session({
        secret: " Jagendra-Srivastava ", // Replace with a secure key for session encryption
        resave: false,
        saveUninitialized: true,
    })
);





//Routes
 
app.use("/", userRouter );



// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).render('404'); // Assuming you have a '404.ejs' template for the 404 page
  });
  



server.listen(port, () => {
    console.log(`server is listing on ${port}`);
});