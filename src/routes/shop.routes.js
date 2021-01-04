const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/shop", (req, res) => { 
        res.render("shop");
    });


    saveNewsletter(app);

}