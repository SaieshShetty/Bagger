const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config")
const PostModel = require("../models/product-model");

router.post('/create', upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await PostModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        req.flash("success", "Products created successfully.!");
        res.redirect("/owners/admin")
    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;