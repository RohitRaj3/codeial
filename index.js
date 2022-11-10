const express = require('express');
//after npm install cookie-parser we need to require it here  and then tell the app to use it in middleware
const cookie = require('cookie-parser')
const app = express();
const port = 8000;
//calling layouts ejs here
const expressLayouts = require('express-ejs-layouts');
//connecting database
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

//middleware

//calling parser
app.use(express.urlencoded());

//calling cookie-parser
app.use(cookieParser());

//using assests
app.use(express.static('./assests'));

//using expresslayouts before routes bcz it need to be render by routes from views
app.use(expressLayouts);

//extract style and scripts from sub pages into a layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//use express routes as middleware function and we will call routes folder
 app.use('/', require('./routes'));

 

 //after making controller and router instal view engines //npm install ejs
  app.set('view engine', 'ejs' );
  app.set('views', './views' );
  
// session middleware 
//mongo store is used to store the session cookie in the db
app.use(session({
  name:'codeial',
  //To do change the secret before deployment in production mode
  secret:"blahsomething",
  saveUninitialized: false,
  resave: false,
  cookie:{                     //Age to cookie same as bank website where session expire after some times
    maxAge: (1000*60*100),       // maxAge comes in millisecond
  },
  store:  new MongoStore({
    mongoUrl :"mongodb://localhost/codeial_development",
    autoRemve:'interval',
    autoRemoveInterval:'1'
    // mongoUrl: process.env.MONGODB_URI
    
  },
  function(err){
    console.log(err || 'connect-mongodb setup ok');
  }
  )
}));

app.use(passport.initialize());
app.use(passport.session());

 //rendering passport file
 app.use(passport.setAuthenticatedUser);




// listen the server where it is an error
app.listen(port, function(err){
    if(err){
    console.log(`Error in loading Server port : ${err}`);
    }
    console.log(`Server is running successfully on port : ${port}`);
})