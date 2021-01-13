const nodemailer = require('nodemailer');

module.exports = function(app) {
    app.get("/contact-us", (req, res) => { 
        res.render("contact-us");
    });

    app.post("/contact-us", (req, res) =>{
        let name = req.body.name;
        let email = req.body.email;
        let subject = req.body.subject;
        let message = req.body.message;
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'leland25@ethereal.email',
                pass: '5p3nukSCr85xsvJNfW'
            }
        });
        
        let mailOptions = {
            from: 'leland25@ethereal.email',
            to: 'marionstaats1@gmail.com',
            subject: 'Contact request Fresh Shop',
            text: `Name: ${name}, Email: ${email}, Subject: ${subject}, Message: ${message}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.render("contact-us", {okMessage: 'Thank you!'});
    })


}