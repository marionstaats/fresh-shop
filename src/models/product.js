const mongoose = require("mongoose");

const Productschema = mongoose.Schema({
        productName: String,
        productPrice: Number,
        productImage: String

});

module.exports = mongoose.model("Product", Productschema);