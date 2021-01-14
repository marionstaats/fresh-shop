const Cart = require("../models/cart");

module.exports = function(app){
    app.route('/finish-checkout')
        .get((req, res) => {
            let sessionId = req.session.id;

            //If logged in - remove session from cart, but keep cart saved
            if(req.isAuthenticated()){
                Cart.updateOne({sessionId: sessionId}, {$set: {sessionId: ""}}, () => {
                    res.redirect("/");
                })
            } else { //Else just delete cart
                Cart.findOneAndDelete({sessionId: sessionId}, () => {
                    res.redirect("/"); 
                })    
            }
        
        })
}