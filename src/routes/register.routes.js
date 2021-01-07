const User = require("../models/user");
const passport = require("passport");

module.exports = function(app){
    // Showing register form 
    app.get("/register", function (req, res) { 
        res.render("register", {
        }); 
    }); 
 

    // Handling user signup 
    app.post("/register", function (req, res) { 
        let username = req.body.username
        let fName = req.body.fName
        let lName = req.body.lName
        let street = req.body.street
        let zipcode = req.body.zipcode
        let town = req.body.town
        let email = req.body.email 
        let password = req.body.password
        
        User.register(new User({ 
            username: username,
            fName: fName,
            lName: lName,
            address : {street : street, zipcode : zipcode, town : town},
            email: email 
        
        }), 
                password, function (err, user) { 

            if (err) { 
                res.render('register', { 
                    message: err.message
                });

                return;
            } 

            passport.authenticate("local")( 
                req, res, function () { 
                res.render("my-account"); 
            }); 
        }); 
    }); 
}