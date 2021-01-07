const passport = require("passport");


module.exports = function(app) {
    //Showing login form 
    app.get("/login", function (req, res) {
        let numberOfItems = 0; 
        res.render("login", {numberOfItems: numberOfItems}); 
    }); 

    //Handling user login 
    app.post("/login", passport.authenticate("local", {
        successRedirect: "/shop",
        failureRedirect: "/login",
        failureFlash: true
    }), function (req, res) { 
        }
    ); 
    

    //Handling user logout 
    app.get("/logout", function (req, res) { 
        req.logout(); 
        res.redirect("/"); 
    }); 

}
