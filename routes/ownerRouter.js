const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const isLoggedIn = require('../middlewares/isLoggedIn');

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(501).send("You don't have permission to create an owner.!");
        }

        let { fullname, email, password } = req.body;

        let createdowner = await ownerModel.create({
            fullname,
            email,
            password
        });
        res.status(201).send(createdowner);
    });
}

router.get('/admin' , isLoggedIn , (req,res) =>{
    let success = req.flash("success") ;
    res.render('createproducts' , { success });
})

router.post('/loginowner' , async (req,res) =>{
    let loggedinown = await ownerModel.findOne({email : req.body.email}) ;
    if(loggedinown){
        res.redirect('/owners/admin')
    }
    else{
        res.send("Something went Wrong.!") ;
    }
})

module.exports = router;