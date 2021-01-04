const express = require("express"); 
const mongoose = require("mongoose");
const passport = require("passport");
const path = require('path');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local"); 
const User = require("./models/user");

//Dotenv - allows you to separate secrets from your source code (passwords etc)
dotenv.config();

//Config of Heroku port
let port = process.env.PORT;

//Connection MongoDB
mongoose.connect(process.env.DB_CONNECT, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//Define paths for express config
const publicDirectory = path.join(__dirname, '../views/public');

//Initiate app
let app = express();

//Setup static directory to serve
app.use(express.static(publicDirectory));

//View engine config
app.set("view engine", "ejs");

////////////////////////////////////////////////////////////////
// Register logic / Passport
////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: true }));  //to support URL-encoded bodies
app.use( bodyParser.json() );       // to support JSON-encoded bodies 

app.use(require("express-session")({ 
	secret: "Albert is not a dog", 
	resave: false, 
	saveUninitialized: false,
	cookie: {}
}));

//In production set 'cookies secure = true' 
if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	sess.cookie.secure = true // serve secure cookies
}

app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

//Get error message when login fails
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    next();
});

// routes
require('./routes/index.routes')(app);
require('./routes/checkout.routes')(app);
require('./routes/about.routes')(app);
require('./routes/contact-us.routes')(app);
require('./routes/register.routes')(app);
require('./routes/my-account.routes')(app);
require('./routes/cart.routes')(app);
require('./routes/gallery.routes')(app);
require('./routes/shop-detail.routes')(app);
require('./routes/shop.routes')(app);
require('./routes/wishlist.routes')(app);
require('./routes/login.routes')(app);


//Connect port (local and heroku)
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log("Server started on port 3000")
});