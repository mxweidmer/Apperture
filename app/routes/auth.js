var authController = require('../controllers/authcontroller.js');
const util = require('util')
const { check, validationResult } = require('express-validator/check');
 
module.exports = function(app,passport) {
 
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

// Sign up routes and validation ==============================================
    app.post('/signup',[
        check('firstname', 'First name is required').isLength({ min: 1 }),
        check('lastname', 'Last name is required').isLength({ min: 1 }),
        check('email', 'A valid email is required').isEmail(),
        check('password', 'A valid password is required').isLength({ min: 1 })
        
        ], function(req, res) {
    
        const errors = validationResult(req);
        console.log(util.inspect(errors, {showHidden: false, depth: null}))
    
        if (!errors.isEmpty()) {
            console.log("error: "+errors.msg);
            res.render('signup', {
                errors: errors.array()
            })
        }
        else
        {
          passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup',
            failureFlash : true
          })(req, res);
        }
      });           
    
 //==============================================================

     app.get('/dashboard',isLoggedIn, authController.dashboard);

    app.get('/logout',authController.logout);

// Sign in routes and validation==============================================
app.post('/signin',[
    check('email', 'A valid email is required').isLength({ min: 5 }),
    check('password', 'A valid password is required').isLength({ min: 5 })
    ], function(req, res) {

    const errors = validationResult(req);
    console.log(util.inspect(errors, {showHidden: false, depth: null}))

    if (!errors.isEmpty()) {
        console.log("error: "+errors.msg);
        res.render('signin', {
            errors: errors.array()
        })
    }
    else
    {
      passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        failureFlash : true
      })(req, res);
    }
  });
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
     
    }

}

