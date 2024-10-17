const express = require('express') ;
const router = express.Router() ;
const isLoggedIn = require('../middlewares/isLoggedIn') ;
const ProductModel = require('../models/product-model') ;
const UserModel = require('../models/user-model');

router.get("/" , (req,res) =>{
    let error = req.flash("error")
    res.render("index" , { error });
})

router.get('/shop' , isLoggedIn , async (req,res) =>{
    let products = await ProductModel.find() ;
    let success = req.flash("success") ;
    res.render("shop" , { products , success }) ;
})

router.get('/addtocart/:id' , isLoggedIn , async (req,res) =>{
    let user = await UserModel.findOne({ email:req.user.email }) ;
    user.cart.push(req.params.id) ;
    await user.save() ;
    req.flash("success" , "Added to Cart")
    res.redirect('/shop') ;
})

router.get('/cart' , isLoggedIn , async (req,res) =>{
    let user = await UserModel.findOne({email : req.user.email}).populate("cart") ;

    res.render("cart" , { user }) ;
})

router.get('/headlogin' , (req,res) =>{
    res.render("owner-login") ;
})

module.exports = router ;