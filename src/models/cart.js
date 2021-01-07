const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
        sessionId: String,
        items: [{itemName: String, itemPrice: Number}],
        dateUpdated: {
                type: Date,
                default: Date.now
        },

});

module.exports = mongoose.model("Cart", CartSchema);
