


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

  module.exports = checkIfLoggedIn;