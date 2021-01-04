const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/cart", (req, res) => { 
        res.render("cart");
    });

    saveNewsletter(app);

}
