const saveNewsletter = require('./functions');


module.exports = function(app) {
    app.get("/contact-us", (req, res) => { 
        res.render("contact-us");
    });

    saveNewsletter(app);

}