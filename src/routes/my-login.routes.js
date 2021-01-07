const saveNewsletter = require('./functions');
const User = require("../models/user");

module.exports = function(app) {
    //Get page with correct address (from user)
    app.get("/my-login", isLoggedIn, (req, res) => { 
        const username = req.session.passport.user; //get the username
        User.findOne({username: username}, (err, data) => {
            res.render("my-login", { username: data.username, fName: data.fName, lName: data.lName}); //show todoEdit html
        });
    })

    // Handling user signup 
    app.post("/my-login", function (req, res) { 
        let newUsername = req.body.newUsername
        let newfName = req.body.newfName
        let newlName = req.body.newlName
        const username = req.session.passport.user; //get the username
        User.findOneAndUpdate(username, {username : newUsername, fName: newfName, lName: newlName}, err => { //find and update content of specific user (if no error)
            if (err) return res.status(500).send(err);
            res.redirect("/my-account"); //go back to url with updated address
        });

    }); 
    
    saveNewsletter(app);

}

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}
