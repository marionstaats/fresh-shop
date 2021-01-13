
module.exports = function(app) {
    app.get("/wishlist", isLoggedIn, (req, res) => { 
        res.render("wishlist");
    });


}

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}
