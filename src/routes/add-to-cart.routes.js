const Cart = require("../models/cart");

module.exports = function(app){
    app.route("/add-to-cart")
        .post((req, res) => { 
        
        //Defining what needs to be added to db if NOT logged in  
        let cartObjectUser = {
            sessionId: req.session.id,                    
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            totalPrice: req.body.totalPrice
        }   
        //Defining what needs to be added to db if logged in  
        if (req.isAuthenticated() == true) {
            cartObjectUser = {  
                sessionId: req.session.id,                      
                username: req.session.passport.user,
                items: req.body.items,
                totalAmount: req.body.totalAmount,
                totalPrice: req.body.totalPrice
            }
        }

        Cart.replaceOne({sessionId: req.session.id}, cartObjectUser,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            
            })                  
    }); 
}

