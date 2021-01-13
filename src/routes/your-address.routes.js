const User = require("../models/user");

module.exports = function(app) {
    //Get page with correct address (from user)
    app.get("/your-address", isLoggedIn, (req, res) => { 
        const username = req.session.passport.user; //get the username
        User.findOne({username: username}, (err, data) => {
            res.render("your-address", { street: data.address.street, zipcode: data.address.zipcode, town: data.address.town}); //show todoEdit html
        });
    })

    // Handling user signup 
    app.post("/your-address", function (req, res) { 
        let street = req.body.street
        let zipcode = req.body.zipcode
        let town = req.body.town
        const username = req.session.passport.user; //get the username
        User.findOneAndUpdate(username, {address : {street, zipcode , town }}, err => { //find and update content of specific user (if no error)
            if (err) return res.status(500).send(err);
            res.redirect("/my-account"); //go back to url with updated address
        });

    }); 
    

}

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}
