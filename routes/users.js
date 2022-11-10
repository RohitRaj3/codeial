const express = require('express');
const router = express.Router();
const passport = require('passport');


// in directory we access users_controller from here
const usersController = require('../controllers/users_controller');

//calling the controllers file
// make a profile page accessible only when user is signed in.
router.get('/profile',passport.checkAuthentication, usersController.profile);

// router.get('/profile', usersController.profile);           // in browser we will write "localhost:8000" - home  "localhost:8000/users/sign-up" - for signUp page
router.get('/sign-up', usersController.signUp);           // sign-up / sign-in is a new varaiable which get called from browser
router.get('/sign-in', usersController.signIn);           // signUp  / signIn is called from users_controllers

//post create which is action form
router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
//use passport as a middleware to authenticate
router.post('/create-session', 
             passport.authenticate('local',{
                failureRedirect: '/users/sign-in'
            }),
            usersController.createSession
);

 router.get('/sign-out',usersController.destorySession);

module.exports = router;