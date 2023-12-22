const login = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            res.redirect('/login');  // Redirecting the user
        }
        
        // Remove the second redirect
        next();  // Now this line will be reached after the redirect
    } catch (error) {
        console.log(error.message + "middilware");
    }
};

const logout =async (req,res,next)=>{
    try{
        if(req.session.userId){
            res.redirect('/dashbord')
        }
        next();
    }
    catch(error){
        console.log(error.message+"midlewereeeeeee");
    }
}
const adminlogout =async (req,res,next)=>{
    try{
        if(req.session.adminId){
            res.redirect('/admin');
        }
        next();
    }
    catch(error){
        console.log(error.message+"midlewereeeeeee");
    }
}
const adminlogin =async (req,res,next)=>{
    try{
   
            if(!req.session.adminId){
                res.redirect('/login'); 
            }

        next();
    }
    catch(error){
        console.log(error.message+"midlewereeeeeee");
    }
}

module.exports={
    login,logout,adminlogout,adminlogin
}