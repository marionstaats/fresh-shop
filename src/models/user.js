const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
        username: String,
        fName: String,
        lName: String,
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
        previousCart: [{itemName: String, itemPrice: Number}],
        wishlist: [{itemName: String, itemPrice: Number}]

});


UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema);

