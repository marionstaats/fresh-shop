const saveNewsletter = require('./functions');
// const isLoggedIn = require('./functions');


module.exports = function(app) {
    app.get("/my-account", isLoggedIn, (req, res) => { 
        let numberOfItems = 0; 
        res.render("my-account", {numberOfItems: numberOfItems}); 

    });


    saveNewsletter(app);

}

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}
