const express = require("express");
const router = express.Router();
const { handleChatWindow, handleUserSignUP, handleUserLoggedIn, handleChatWindowView, handleUserMessageInput, handleUserLogin, handleUserLogout } = require("../controllers/user");
const checkIfLoggedIn = require("../middleware/user");

// Define routes
router.get("/", handleChatWindow);
router.post("/signup", handleUserSignUP);
router.route("/login")
  .get(checkIfLoggedIn, handleUserLoggedIn)
  .post(handleUserLogin);
router.get("/chat", handleChatWindowView);
router.post("/chat", handleUserMessageInput);
router.get("/logout", handleUserLogout);

// Catch-all route for undefined routes
router.use((req, res) => {
  res.status(404).render('404'); 
});

module.exports = router;
