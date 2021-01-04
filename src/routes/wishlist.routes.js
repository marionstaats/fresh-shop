const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/wishlist", (req, res) => { 
        res.render("wishlist");
    });


    saveNewsletter(app);

}