const userModal = require('../models/userModal');
const bycrypt = require('bcrypt');
const nodemailer = require('nodemailer');
var i=0;

//admin home controller
const adminPage=async (req,res)=>{
    try{
      var serach=await userModal.find({}).exec();
        console.log(req.session.adminId);
        console.log("is gone");
        if(req.session.er){
          var err=req.session.er;
          req.session.er=undefined;
          res.render('admin/dashboard',{name:  req.session.name,email: req.session.email,phone:req.session.phone,serach,err})
          
        }
        else{

          res.render('admin/dashboard',{name:  req.session.name,email: req.session.email,phone:req.session.phone,serach})
        }
    }
    catch(err){
        console.log(err.message+"here");
    }
}

//secure pass
const securePassword = async (pass) => {
  try {
      const passwordHash = await bycrypt.hash(pass, 10);
      return passwordHash;
  }
  catch (err) {
      console.log(err.message);
  }
}


//admin search controller
const adminSerach=async (req,res)=>{
 console.log(req.body);
   
     if(req.body.playload){
        var playload=req.body.playload.trim();
        serach= await userModal.find({$or:[{name:{$regex:new RegExp(`.*${playload}.*`,'i')}},{mobile:{$regex:new RegExp(`.*${playload}.*`,'i')}},{email:{$regex:new RegExp(`.*${playload}.*`,'i')}}]}).exec()
             //mobile
           res.send({serach})
     }
      

        if(req.query.id){
         let  newModal= await userModal.find({mobile:req.query.id})
            let name1=req.body.newname?req.body.newname:newModal.name;
            let email1=req.body.newemail?req.body.newemail:newModal.email;
            let mobile1=req.body.newmobile?req.body.newmobile:newModal.mobile;
           done=  await userModal.findOneAndUpdate({mobile:req.query.id},{$set:{name:name1,email:email1,mobile:mobile1}},{new:true});
  
          if(done){
        res.redirect('/admin');
          }
            
        }
      if(req.query.dlt){
    var  dlt=  await userModal.findOneAndDelete({mobile:req.query.dlt});
      if(dlt){
        res.redirect('/admin');
      }
      }
      if(req.body.addname){
       
      try {
          const sp = await securePassword(req.body.addpassword);
          const user1 = new userModal({
              name: req.body.addname,
              email: req.body.addemail,
  
              mobile: req.body.addmobile,
              password: sp,
              is_admin: 0,
  
  
          })
  
          const userData = await user1.save();
         if(userData){
             res.redirect('/admin')
         }
      }
      catch (error) {
          console.log(error.message + "this is");
          console.log(error.keyPattern);
          if (error.keyPattern.mobile) {
        req.session.er = "mobile number has been taken ";
              res.redirect('/admin')
          }
          else if (error.keyPattern.email) {
         req.session.er = "email has been taken ";
            res.redirect('/admin')
  
          }
          else {
              res.send("fuck you cunt")
          }
  
      }
      }
          
}

          
  

module.exports ={adminPage,adminSerach}