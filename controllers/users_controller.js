const User = require('../models/user');  //require user from models or had created schema to find it in database

module.exports.profile = function(req,res){
    // res.end('<h1>User Profile</h1>')
    // res.render('users',{
        // title: 'Profile successfully executed'
    // })

    //Showing details of signed in user 
    //after user signed in the page show them their details of pages
       //step-1:- check the user_id in cookie
       if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('users_profile',{
                    title: "User profile",
                    user: user
                })
            }else{
                return res.redirect('user/sign-in');
            }
        })
       }
}
//rendering sign up pages
module.exports.signUp = function(req,res){
    //this will shown if users one's sgnup & seen the profile then it will redirect to profile page.
    //if he again go to sign up/sign in page
     //if user try to sign up or sign in  again then it will redirected to users profile 
     if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    res.render('users_sign_up',{                 //users_sign_up / users_sign_in is from directory
        title: 'codeial|Sign Up'                //signUp / signIn is new variable using for calling this controllers in routers 
    })
}
//rendering sign in pagess
module.exports.signIn = function(req,res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('users_sign_in',{
        title: 'codeial | Sign In'
    })
}

//Manual Authentication
//get sign up form action name = "/users/create"
module.exports.create = function(req,res){               //create is form action name
    
    //Step-1:- match the password with confirm_password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }                    
                    
    //step-2:- find the email or username from database
    //to check require the user from models

    User.findOne(
        { email:req.body.email},function(err,user){if(err){console.log('error in finding user in sigining up',err); return;}
                    
     //step-3:- if user not found then create, and send it to signup page
    // create is a form action

    if(!user){
        User.create(req.body , function(err, user){
            if(err){
                console.log('error in creating user while signing up',err);
                return;
            }
            return res.redirect('/users/sign-in')
        })
        // redirect it back to the same pages
    }else{
        return res.redirect('back');
    }
})
    }           
                    

//get sign in form  whose action name = "/users/create-session"
module.exports.createSession = function(req,res){
     User.findOne({
         email: req.body.email
     },
     function(err, user){
         if(err){
             console.log('error in finding user in signing in',err);
             return;
           }
         //handle user found
         if(user){
             //handle password which doesn't match
             if(user.password != req.body.password){
                 return res.redirect('back');
             }
         //handle session creation
         res.cookie('user_id', user.id);
         return res.redirect('/users/profile');

         }else{
          //handle user not found
            return req.redirect('back');
        }
     }
     )
}

//sign in & create session 
module.exports.createSession = function(req,res){
    return res.redirect('/');
}
//sign out the page
module.exports.destorySession = function(req,res){
    req.logout();
    return res.redirect('/');
}



       //after all above manual authentication we uses passport library to authentication
//can gearch on google passport.js
       //step 1:- npm install passport
       //step 2:- npm install passport-local