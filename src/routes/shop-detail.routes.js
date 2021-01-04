const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/shop-detail", (req, res) => { 
        res.render("shop-detail");
    });


    saveNewsletter(app);

}