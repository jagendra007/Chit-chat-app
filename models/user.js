const mongoose = require("mongoose");

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

module.exports = UserData;