const saveNewsletter = require('./functions');
const User = require("../models/user");
const Cart = require("../models/cart");

module.exports = function(app) {
    app.get("/cart", (req, res) => { 
        if (req.isAuthenticated() == true){
            const username = req.session.passport.user;
            User.findOne({username: username}, (err, result) => {
                arrayOfItems = result.currentCart.length;
                res.render("cart", {arrayOfItems: arrayOfItems});
            });
        } else {
            let sessionId = req.session.id;
            Cart.findOne({sessionId: sessionId}, (err, result) => {
                if (result == null) {
                    arrayOfItems = '0';
                } else {
                    arrayOfItems = result.items.length;
                }
                res.render("cart", {arrayOfItems: arrayOfItems});
            });
        }
        
    });

    saveNewsletter(app);

}


