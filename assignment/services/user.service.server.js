module.exports = function (app,UserModel,WebsiteModel) {

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/logout",logout);
    app.post("/api/register",register);
    app.get("/api/loggedin",loggedin);
    app.post("/api/checkLogin",checkLogin);


    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new LocalStrategy(localStratergy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    //Serielize the user cookie
    function serializeUser(user, done) {
        done(null, user);
    }

    //deserialize the data that has been used
    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStratergy(username , password, done) {
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        return done(null, user)
                    }
                    else{
                        return done(null, false);
                    }
                },
                function (err) {
                    if(err){ return done(err);}
                }
            )
    }

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
    app.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));


    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
    app.get('/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newFacebookUser = {
                            username: profile.displayName,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            _id:profile.id,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return UserModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function googleStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return UserModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function register(req,res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        UserModel
            .createUser(user)
            .then(
                function (user) {
                    if (user){
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err)
                            } else{
                                console.log("Yes it is working!")
                                res.json(user)
                            }
                            
                        })
                    }
                    
                }
            );
    }
    
    function loggedin(req,res) {
        res.send(req.isAuthenticated() ? req.user : '0')
    }

    function login(req,res){
        var user = req.user;
        req.login(user, function (err) {
            if(err){
                res.status(400).send(err)
            } else{
                console.log("Yes it is working!")
                res.json(user);            }
        })

    }

    function logout(req,res) {
        req.logOut();
        res.sendStatus(200);
    }

    function updateUser(req,res) {
        var userId = req.params.userId;
        var user= req.body;
        UserModel
            .updateUser(userId,user)
            .then(function (user) {
                res.sendStatus(200)
            },function (err) {
                res.send(err)
            })
    }
    function createUser(req,res) {
        var newUser=req.body;
        UserModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user)
            }, function (err) {
                res.send(err)
            })

    }
    function findUserById(req,res) {
        var userId= req.user._id;
        UserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user)
            },function (err) {
                res.send(err)
            })
    }

    function findUser(req,res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password){
            findUserByCredentials(req,res);
        }
        else if (username){
            findUserByUsername(req,res);
        }
    }

    function findUserByCredentials(req,res) {
        console.log();
        UserModel
            .findUserByUsername(req.query.username)
            .then(function (user) {
                console.log("hello")
                if (bcrypt.compareSync(req.query.password, user.password)){
                    res.json(user)
                }else{
                    res.json({})
                }
            },function (err) {
                res.send(err)
            })
    }

    function deleteUser(req,res) {
        var userId= req.params.userId;
        WebsiteModel
            .deleteAllWebsites(userId)
            .then(function (status) {
                UserModel
                    .deleteUser(userId)
                    .then(function (status) {
                        res.sendStatus(200)
                    })
                res.sendStatus(200)
            })

    }
    function findUserByUsername(req,res) {
        UserModel
            .findUserByUsername(req.query.username)
            .then(function (user) {
                if (user == null){
                    res.sendStatus(404)
                }
                else{
                    res.json(user)
                }
            })
    }
}