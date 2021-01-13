const Cart = require("../models/cart");


//PROBLEM: RENDERS PAGE BEFORE SAVING ADDED ITEM TO DB!!!!!!!!

module.exports = function(app) {
    app.get("/shop", (req, res) => {
            let sessionId = req.session.id;
            Cart.findOne({sessionId}, (err, result) => {
                if (result == null) {
                    numberOfItems = '0';
                    res.render("shop", {numberOfItems});
                } else {
                    numberOfItems = String(result.items.length);
                    res.render("shop", {numberOfItems});
                }
            });
        
    });


}