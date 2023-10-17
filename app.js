const express = require("express");
const app = express();
const http  = require("http");
const ejs = require("ejs");
const dbconnect = require("./config/database").then;
const bodyParser = require("body-parser");
const session = require("express-session");
const server = http.createServer(app)
const userRouter = require("./routes/user");

const createServer = require("./socket/socketio");
require('dotenv').config();

const port = process.env.PORT || 3000;
createServer(server);
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))


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