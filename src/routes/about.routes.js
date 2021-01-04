const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/about", (req, res) => { 
        res.render("about");
    });


    saveNewsletter(app);

}