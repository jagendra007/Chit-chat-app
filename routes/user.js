const express = require("express");
const UserData = require("../models/user");
const checkIfLoggedIn = require("../middleware/user")
const router = express.Router();
const {handleUserLogin,handleUserSignUP, handleChatWindow,handleUserLoggedIn,handleChatWindowView,handleUserMessageInput, handleUserLogout} = require("../controllers/user")




router.get("/", handleChatWindow);


router.post("/signup", handleUserSignUP);

router.get("/login", checkIfLoggedIn, handleUserLoggedIn )
router.get("/chat", handleChatWindowView )
router.post("/chat",handleUserMessageInput)

router.post("/login",handleUserLogin)


router.get("/logout", handleUserLogout);

// Catch-all route for undefined routes
router.use((req, res) => {
    res.status(404).render('404'); // Assuming you have a '404.ejs' template for the 404 page
});

module.exports = router;