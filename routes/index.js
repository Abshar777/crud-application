const express = require('express');
const router = express.Router();
const middileware = require('../middleware/auth');
const userControl=require('../controllers/userController');


//rediricting user or note 
router.get('/', middileware.login, (req, res) => res.redirect('/login'));

// login page setup
router.get('/login', middileware.logout, middileware.adminlogout,userControl.resubmition);

//login post
router.post('/login',userControl.loginchecking )

//sing-up page setup
router.get('/sing-up', middileware.logout, userControl.singUpResubmition);

//sign-up page post 
router.post('/sing-up', userControl.signUpPage)

//home(dashbord)setup
router.get('/dashbord', middileware.login, userControl.dashbord);

//logout setup
router.get('/logout',userControl.logout)

//verify setup
router.get('/verify',userControl.verify )



module.exports = router;
