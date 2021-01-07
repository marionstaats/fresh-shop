const Cart = require("../models/cart");
const User = require("../models/user");

module.exports = function(app){
    app.post("/add-to-cart", async function (req, res) {
        //Store data in User db if logged in
        if (req.isAuthenticated() == true){ 
            const username = req.session.passport.user;
            let newItem = {itemName: req.body.itemName, itemPrice: req.body.itemPrice};
            User.findOneAndUpdate({username: username}, {$push: {currentCart: newItem }}, err => { 
                if (err) return res.status(500).send(err);
                res.redirect("/shop");
                console.log('saved item to user') 
            });
    
        //Store data into cart db with session id if not logged in
        } else { 
            let sessionId = req.session.id;
            Cart.countDocuments({sessionId: sessionId}, async (err, count) => {
                if (count === 0){
                    const newCart = new Cart({
                        sessionId: sessionId,
                        items: {itemName: req.body.itemName, itemPrice: req.body.itemPrice}
                    });
                        try {
                            await newCart.save();
                            console.log('saved') 
                
                        } 
                        catch (err) {
                            console.log(err)
                        }
                } else {
                    let newItem = {itemName: req.body.itemName, itemPrice: req.body.itemPrice}
                    Cart.findOneAndUpdate(
                        {sessionId: sessionId},
                        {$push: {items: newItem}}, err => {
                            if (err) {
                                console.log(error);
                            } 
                        }
                    )                    
                }
            })    
        }
    }); 
}

