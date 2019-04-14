//major step is writing our passport strategies.In passport.js, we will use the user model and passport.First, we import bcrypt which we need to secure passwords.

//load bcrypt
var bCrypt = require('bcrypt-nodejs');
 
//initialize the passport-local strategy, and the user model, which will be passed as an argument.
module.exports = function(passport, user) {
 
    var User = user;
 
    var LocalStrategy = require('passport-local').Strategy;
    //Passport has to save a user ID in the session, and it uses this to manage retrieving the user details when needed.
    //To solve this, we are going to implement both the serialize and deserialize functions of passport 

    //First we the add the serialize function. In this function, we will be saving the user id to the session.
    passport.serializeUser(function(user, done) {
    done(null, user.id);
    });

    // In the deserialize function, we use the Sequelize findByPk promise to get the user, and if successful, an instance of the Sequelize model is returned. To get the User object from this instance, we use the Sequelize getter function like this: user.get(). 
    passport.deserializeUser(function(id, done) {
 
    User.findByPk(id).then(function(user) {
 
        if (user) {
 
            done(null, user.get());
 
        } else {
 
            done(user.errors, null);
 
        }
 
    });
 
    });
    // custom strategy with our instance of the LocalStrategy like this, declared what request (req) fields our usernameField and passwordField (passport variables) are. 

    //The last variable passReqToCallback allows us to pass the entire request to the callback, which is particularly useful for signing up.

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        //this callback function,In this function, we will handle storing a user's details.
        function(req, email, password, done) {
 
            //hashed password generating function inside the callback function.
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            // using the Sequelize user model we initialized earlier as User, we check to see if the user already exists, and if not we add them
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user)
                {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else
                {
                    var userPassword = generateHash(password);
 
                    var data =
                        {
                            email: email,
                            password: userPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        };
                    //User.create() is a Sequelize method for adding new entries to the database. Notice that the values in the data object are gotten from the req.body object which contains the input from our signup form.
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
 
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
 
            });
 
        }
 
    ));

    //LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
 
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
 
 
    function(req, email, password, done) {
        var User = user;
 
        var isValidPassword = function(userpass, password) {
            return bCrypt.compareSync(password, userpass);
        }
 
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
 
            if (!user) {
 
                return done(null, false, {
                    message: 'Email does not exist'
                });
 
            }
 
            if (!isValidPassword(user.password, password)) {
 
                return done(null, false, {
                    message: 'Incorrect password.'
                });
 
            }
 
 
            var userinfo = user.get();
            return done(null, userinfo);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    }
 
));
 
}