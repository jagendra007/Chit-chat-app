
const express = require("express");
const app = express();
const http  = require("http");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const server = http.createServer(app)

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



//User schema

const userSchema = new mongoose.Schema(
    {
    name: String,
    email: String,
    password: String,
},
{timestamps:true}
)

// User Model

const UserData = mongoose.model("UserData", userSchema);


// Middleware function to check if the user is already logged in
function checkIfLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        console.log(req.session.user);
        next();
      // If the user is logged in, redirect to a chat page
     
      
    }else{
      res.redirect("/login"); 
    }
    
  
  }

  
app.get("/", (req, res) => {
    console.log("session",req.session)
    if(req.session?.user){
        res.redirect("/chat")
    }else{    
      res.render("signUpLogin.ejs");
      console.log("Root Route")
    }
});


app.post("/signup", async (req, res) => {
    const username = req.body.txt;
    const userEmail = req.body.email;
    const userPassword = req.body.pswd;
    try {

        const user = new UserData({
            name: username,
            email: userEmail,
            password: userPassword,
        })

        await user.save();
        console.log(user.name + " is added to database");
        res.redirect("/");

    } catch (error) {
        res.status(404).send(error);
    }
   
});



app.get("/login",checkIfLoggedIn, (req, res) => {
    try {
        if (req.session.user) {
            res.redirect("/chat")
            console.log(req.session);
        }else{
            // req.session.destroy;
            // console.log(req.session.user.name);
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
})


app.get("/chat", (req,res)=>{
    if(req.session?.user){
      console.log(req.session.user.name);
        res.render("chatWindow", {currentUser: req.session.user});
        
    }else{    
        res.redirect("/");
    }
    

})

app.post("/chat",(req,res)=>{
    const usermsg = req.body.usermsg;
    console.log(usermsg);
})

app.post("/login", async (req, res) => {
   
    const userEmail = req.body.email;
    const userPassword = req.body.pswd;
    const dbUser = await UserData.findOne({ email: userEmail, password: userPassword }).exec();

    if (dbUser) {

        req.session.user = dbUser;

        res.redirect("/login")
    } else {
        res.redirect("/")
        console.log("User Not Found  ")
    }


})


app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/");
    });
});




// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).render('404'); // Assuming you have a '404.ejs' template for the 404 page
  });
  



server.listen(port, () => {
    console.log(`server is listing on ${port}`);
});