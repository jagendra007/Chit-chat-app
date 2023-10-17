const UserData = require("../models/user")


async function handleUserLogin (req, res){

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
}


async function handleUserSignUP(req, res) {
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

}

async function handleChatWindow (req, res){
   
        console.log("session", req.session)
        if (req.session?.user) {
            res.redirect("/chat")
        } else {
            res.render("signUpLogin.ejs"); 
            console.log("Root Route")
        }
    
}

function handleUserLoggedIn(req, res){

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
    
}


function handleChatWindowView(req, res){

        if (req.session?.user) {
            console.log(req.session.user.name);
            res.render("../views/chatWindow", { currentUser: req.session.user });
    
        } else {
            res.redirect("/");
        }
}


function handleUserMessageInput(req, res){

        const usermsg = req.body.usermsg;
        console.log(usermsg);
    
}


function handleUserLogout(req, res){

        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
            }
            res.redirect("/");
        });
    
}


module.exports = {
    handleUserLogin,
    handleUserSignUP,
    handleChatWindow,
    handleUserLoggedIn,
    handleChatWindowView,
    handleUserMessageInput,
    handleUserLogout,
}