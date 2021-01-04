const passport = require("passport");


module.exports = function(app) {
    //Showing login form 
    app.get("/login", function (req, res) { 
        res.render("login", {
        }); 
    }); 

    //Handling user login 
    app.post("/login", passport.authenticate("local", {
        successRedirect: "/profile",
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
