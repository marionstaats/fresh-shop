const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/checkout", (req, res) => { 
        res.render("checkout");
    });

    saveNewsletter(app);

}