const saveNewsletter = require('./functions');
const User = require("../models/user");
const Cart = require("../models/cart");

module.exports = function(app) {
    app.get("/shop", (req, res) => {
        if (req.isAuthenticated() == true){
            const username = req.session.passport.user;
            User.findOne({username: username}, (err, result) => {
                numberOfItems = String(result.currentCart.length);
                res.render("shop", {numberOfItems: numberOfItems});
            });
        } else {
            let sessionId = req.session.id;
            Cart.findOne({sessionId: sessionId}, (err, result) => {
                if (result == null) {
                    numberOfItems = '0';
                } else {
                    numberOfItems = String(result.items.length);
                }
                res.render("shop", {numberOfItems: numberOfItems});
            });

        }
    });


    saveNewsletter(app);

}