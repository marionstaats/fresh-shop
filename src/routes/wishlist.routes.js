const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/wishlist", isLoggedIn, (req, res) => { 
        res.render("wishlist");
    });


    saveNewsletter(app);

}

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}
