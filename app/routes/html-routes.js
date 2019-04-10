



// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
/*
  app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signin.hbs"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.hbs"));
  });

  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dashboard.hbs"));
  });
  */

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.render('signin');
  });
};


