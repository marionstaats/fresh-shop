const Cart = require("../models/cart");

module.exports = function(app){
    app.route('/finish-checkout')
        .get((req, res) => {
            let sessionId = req.session.id;
            Cart.findOneAndDelete({sessionId: sessionId}, () => {
                    res.redirect("/"); //go back to home url
                }
            )    
            
        })
}