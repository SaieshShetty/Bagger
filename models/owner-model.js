const mongoose = require('mongoose') ;

const OwnerSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    products : {
        type : Array ,
        default : []
    },
    gstin : String,
    picture : String
}) ;

module.exports = mongoose.model("owner" , OwnerSchema) ;