const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
        sessionId: String,
        username: String,
        items: [{
                itemName: {type: String, default: ""}, 
                itemAmount: {type: Number, default: 0},
                itemImage: {type: String, default: ""},
                subTotal: {type: Number, default: 0},
        }],
        totalAmount: {type: Number, default: 0},
        totalPrice: {type: Number, default: 0},
        dateUpdated: {
                type: Date,
                default: Date.now
        },

});

module.exports = mongoose.model("Cart", CartSchema);
