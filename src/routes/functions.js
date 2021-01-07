//Save newsletter
const Newsletter = require("../models/newsletter");

const saveNewsletter = (app) => {
        app.post(`/`, async (req, res) => { 
            const newsletter = new Newsletter({ 
                email: req.body.Email 
            });
            try {
                await newsletter.save(); //save the new object in db
                res.redirect(`/`); //redirecting to updated page (refresh)
            } 
            catch (err) {
                res.redirect(`/`);
            }
            
        })  
};

// function isLoggedIn(req, res, next) { 
// 	if (req.isAuthenticated()) return next(); 
// 	res.redirect("/login"); 
// }

module.exports = saveNewsletter;
// module.exports = isLoggedIn;
