const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
        username: String,
        fName: String,
        lName: String,
        phonenumber: Number,
        email: String,
        password: String,
        dateSubcribed: {
            type: Date,
            default: Date.now
        },
        address: {
            street: String,
            zipcode: String,
            town: String
        },
        currentCart: [{itemName: String, itemPrice: Number}],
        previousCart: [{itemName: String, itemPrice: Number}],
        wishlist: [{itemName: String, itemPrice: Number}]

});


UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema);

