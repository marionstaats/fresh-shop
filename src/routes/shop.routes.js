const saveNewsletter = require('./functions');
const User = require("../models/user");

module.exports = function(app) {
    app.get("/shop", (req, res) => {
        let numberOfItems = 0;
        if (req.isAuthenticated() == true){
            const username = req.session.passport.user;
            User.countDocuments(username, (err,count)=>{
                numberOfItems = count.currentCart
            })
        }
        res.render("shop", {numberOfItems: numberOfItems});
    });


    saveNewsletter(app);

}