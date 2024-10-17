const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = UserModel;