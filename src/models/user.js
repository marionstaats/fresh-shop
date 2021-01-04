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
        }

});


UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema);

