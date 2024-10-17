const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let user = await UserModel.findOne({ email: email });
        if (user) res.status(401).send("You already have an account.Please log in.!");

        else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) res.send(err.message);
                    else {
                        let createdUser = await UserModel.create({
                            fullname,
                            email,
                            password: hash
                        });

                        let token = generateToken(createdUser);
                        res.cookie("token", token);
                        res.send("User Created Successfully");

                    }
                })
            })
        }
    } catch (error) {
        res.send(error.message);

    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) return res.send("Email or Password is Incorrect.!");

    else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop") ;
            }
            else {
                return res.send("Email or Password is Incorrect.!");
            }
        })
    }
}

module.exports.logoutUser = (req,res) =>{
    res.cookie("token","") ;
    res.redirect('/') ;
}