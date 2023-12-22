const express = require('express');
const router = express.Router();
const middileware=require('../middleware/auth');
const adminController=require('../controllers/adminController');

// admin home
router.get('/',middileware.adminlogin,adminController.adminPage);

//admin post
router.post('/',adminController.adminSerach)

  module.exports = router;

