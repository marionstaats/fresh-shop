const User = require("../models/user");
const passport = require("passport");
const Cart = require("../models/cart");


module.exports = function(app) {
    app.get("/checkout", (req, res) => {

        //If nothing in cart - send back to shop
        let sessionId = req.session.id;
        Cart.findOne({sessionId: sessionId}, (err, result) => {
            if (result == null) {
                return res.redirect("/shop");
            } else {
                arrayOfItems = result.items.length;
                let totalAmount = 0;
                result.items.forEach((item)=>{
                    totalAmount += (item.itemPrice * item.itemNumber)
                })

                //Get page with address pre-filled if logged in
                if(req.isAuthenticated()){
                    const username = req.session.passport.user; //get the username
                    User.findOne({username: username}, (err, data) => {
                        res.render("checkout", { fName: data.fName, lName: data.lName, email: data.email, street: data.address.street, zipcode: data.address.zipcode, town: data.address.town, arrayOfItems: result.items, totalPrice: result.totalPrice}); 
                    });
            
                // Get page with empty fields if not logged in    
                } else {
                    res.render("checkout", { fName: '', lName: '', email: '', street: '', zipcode: '', town: '', arrayOfItems: result.items, totalPrice: result.totalPrice});
                }

                

            }
        })
        
            
    })    

    //Handling user login 
    app.post("/login-checkout", passport.authenticate("local", {
        successRedirect: "/checkout",
        failureRedirect: "/checkout",
        failureFlash: true
    }), function (req, res) { 
        }
    ); 
    

}

