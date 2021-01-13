//Save newsletter
const Newsletter = require("../models/newsletter");

module.exports = function(app){
    app.route("/newsletter")
        .post((req, res) => { 
            const newsletter = new Newsletter({ 
                email: req.body.email 
            });
            try {
                newsletter.save(); //save the new object in db
            } 
            catch (err) {
                res.send(err);
            }
            
        })  
};
