const User = require("../Models/UserModels");

const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {

    try{
        const {email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.json({message: "User already exists"});
        }
    
        const user = await User.create({ email, password, username, createdAt });
        res.status(201).json({ message: "User signed in successfully", success: true, user });
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
  }};
