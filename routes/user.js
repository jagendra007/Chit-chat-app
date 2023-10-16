const express = require("express");
const UserData = require("../models/user");
const checkIfLoggedIn = require("../middleware/user")
const router = express.Router();

router.get("/", (req, res) => {
    console.log("session", req.session)
    if (req.session?.user) {
        res.redirect("/chat")
    } else {
        res.render("signUpLogin.ejs"); 
        console.log("Root Route")
    }
});


router.post("/signup", async (req, res) => {
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



router.get("/login", checkIfLoggedIn, (req, res) => {
    try {
        if (req.session.user) {
            res.redirect("/chat")
            console.log(req.session);
        } else {
         
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
})


router.get("/chat", (req, res) => {
    if (req.session?.user) {
        console.log(req.session.user.name);
        res.render("../views/chatWindow", { currentUser: req.session.user });

    } else {
        res.redirect("/");
    }


})

router.post("/chat", (req, res) => {
    const usermsg = req.body.usermsg;
    console.log(usermsg);
})

router.post("/login", async (req, res) => {

    const userEmail = req.body.email;
    const userPassword = req.body.pswd;
 

    const dbUser = await UserData.findOne({ email: userEmail, password: userPassword }).exec();
   

    if (dbUser) {

        req.session.user = dbUser;

        res.redirect("/login");
    } else {
        res.redirect("/");
        console.log("User Not Found  ");
    }


})


router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/");
    });
});




// Catch-all route for undefined routes
router.use((req, res) => {
    res.status(404).render('404'); // Assuming you have a '404.ejs' template for the 404 page
});

module.exports = router;