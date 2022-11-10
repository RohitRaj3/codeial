// library will be initialize once it will take from index.js codeial file           {step-1}
const express = require ('express');

// calling express.Router which route to different page                               {step-1}
const router = express.Router();

//call home_controller here                                                                         {step-2}
 const homeController = require('../controllers/home_controller');

console.log( 'router loaded');

//routing it to home function                                                                        {step-2}
router.get('/', homeController.home);
//routing to other routes
router.use('/users', require('./users'));  
// router.use('/pratices', require('./pratices'));                                                                         //{Step-3}

//all the app.get , app.post will tell to use this index.js by below line              {step-1}
module.exports = router;
// after module.express go in index.js of codeial file and app.use 
