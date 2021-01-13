const Cart = require("../models/cart");

module.exports = function(app) {
    app.get("/cart", (req, res) => { 
                res.render("cart");
    });
}


