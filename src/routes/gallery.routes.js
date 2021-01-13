
module.exports = function(app) {
    app.get("/gallery", (req, res) => { 
        res.render("gallery");
    });

}