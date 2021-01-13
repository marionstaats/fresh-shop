module.exports = function(app) {
    app.get("/my-account", isLoggedIn, (req, res) => { 
        res.render("my-account"); 

    });

}

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}
