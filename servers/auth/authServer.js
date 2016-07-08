var express = require('express');
var app = express();
var request = require('request');

var passport = require('passport');
var GoogleStrat = require('passport-google-oauth').OAuth2Strategy;


var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 8080;
var googleCB = 'http://'+host+':'+port+'/auth/google/callback';

var GOOGLE_CLIENT_ID = require('./auth.config.js').CLIENT_ID;

var GOOGLE_CLIENT_SECRET = require('./auth.config.js').CLIENT_SECRET;


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  //TODO: find user in DB and then deserialize user -- call done inside the on success cb for query
  done(null, user);
});

passport.use(new GoogleStrat({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: googleCB
},
function(accessToken, refreshToken, profile, done) {
  console.log(accessToken, refreshToken, profile);
  //TODO: save user to google login table with accesstoken
  //search for user in DB
    //if user is found, then log them in (return done(null, user))
    //otherwise, create a new user in the db
    process.nextTick(function () {
      console.log(accessToken, refreshToken);
      return done(null, profile);
    });
  }
));

app.use(passport.initialize());


app.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000', successRedirect: 'http://localhost:3000/profile'})
);



app.listen(8080, () => { console.log('connected to 8080...')});
