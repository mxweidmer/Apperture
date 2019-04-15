var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
require('dotenv').config();
var exphbs = require('express-handlebars');
var flash = require('connect-flash');

var PORT = process.env.PORT || 8080;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect flash
app.use(flash());

// For Passport;
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.use(express.static("app/public"));


//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);
require("./app/routes/html-routes")(app);
require("./app/controllers/postController.js")(app);


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.User);

//Sync Database
models.sequelize.sync().then(function () {

    console.log('Nice! Database Working Fine')
    // Port configuration
    app.listen(PORT, function (err) {

        if (!err)
            console.log("Listening Server....!");
        else console.log(err)

    });

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});


