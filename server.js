
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("bosy-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local"),Strategy;
//=============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

//Routes ========================================================

var routes = require("./routes/index.js")(app);
var users = require("./routes/users.js")(app);

// Sets up the Express app to handle data parsing================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars================================================
app.set("view", path.join(__dirname,"view"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// BodyParser Middleware==========================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
    
// Static directory==============================================
app.use(express.static(path.join(__dirname,"public")));

// Express Session===============================================

app.use(session({
    secret:"secret",
    saveUninitialized:true,
    resave:true
}))

// Passport init==================================================

app.use(paassport.initialize());
app.use(passport.session());

// Express Validator==============================================
app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += "[" +namespace.shift() + "]";
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

// Connect Flash=================================================

app.use(flash());

// Global Vars===================================================

app.use(function (req, res, next){

    res.locals.success_msg = req.flash("success_msg");
    res.locals.erro_msg = req.flash("erro_msg");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", routes);
app.use("/",users);



// Syncing our sequelize models and then starting our Express app

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });