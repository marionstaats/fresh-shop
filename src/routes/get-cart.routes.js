const Cart = require("../models/cart");

module.exports = function(app) {
    app.route('/get-cart')
    //Get page with correct address (from user)
    .post((req, res) => { 
        Cart.findOne({sessionId: req.session.id}, (err, data) => {
            if (err){ 
                console.log('error:', err) 
            } 
            else{ 
                //If Cart with this session does not exist - create new
                if (data === null){
                    //Defining what needs to be added to db if NOT logged in  
                    let cartObjectUser = {sessionId: req.session.id}

                    //Defining what needs to be added to db if logged in  
                    if (req.isAuthenticated() == true) {
                        cartObjectUser = {                        
                            sessionId: req.session.id,
                            username: req.session.passport.user,
                        }
                    }

                    //Check if cart for this session already exists
                    Cart.countDocuments({sessionId: req.session.id}, (err, count) => {
                        //Create new cart if nothing with this session
                        if (count === 0){
                            const newCart = new Cart(cartObjectUser);
                                newCart.save();
                                res.send(newCart)
                            
                        }  
                        
                    })    

                } else {
                    res.send(data);
                }
            } 
        });
    })

}
