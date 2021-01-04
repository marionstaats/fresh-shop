const saveNewsletter = require('./functions');
// const isLoggedIn = require('./functions');


module.exports = function(app) {
    app.get("/my-account", isLoggedIn, (req, res) => { 
        res.render("my-account");
    });


    saveNewsletter(app);

}

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}
