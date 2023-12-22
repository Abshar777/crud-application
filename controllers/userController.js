const userModal = require('../models/userModal');
const bycrypt = require('bcrypt');
const nodemailer = require('nodemailer');


// verification email
const verifyemail = async (name, email, id) => {
    try {

        const transport = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: "absharameen625@gmail.com",
                pass: "vlfg cejw abfd zkvn",
            }
        });
        const mailoption = {
            from: "absharameen625@gmail.com",
            to: email,
            subject: 'for verification mail',
            html: `<p>hi ${name} please click here <a href='http://localhost:3000/verify?id=${id}'>verify</a>`
        }
        transport.sendMail(mailoption, (err, info) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(`Email has been sent: ${info.messageId}`);
                console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

//login page controller 
const loginchecking = async (req, res) => {
    try {
        console.log("is enterd");
        const Email = req.body.email;
        const pass = req.body.password;
        const findEmail = await userModal.findOne({ email: Email });

        if (findEmail) {

            const passMatch = await bycrypt.compare(pass, findEmail.password);
            if (passMatch) {
                if (findEmail.is_admin === 1) {
                    req.session.adminId = findEmail._id;
                    req.session.name = findEmail.name;
                    req.session.email = findEmail.email;
                    req.session.phone = findEmail.mobile;

                    res.redirect('/admin');
                }
                else {

                    req.session.userId = findEmail._id;
                    req.session.name = findEmail.name;
                    req.session.email = findEmail.email;
                    res.redirect('/dashbord');

                }

            }
            else {
                req.session.eror = "password is wrong";
                res.redirect('/login')


            }
        } else {
            req.session.eror = "email is not exist";
            res.redirect('/login')
        }
    }
    catch (err) {
        console.log(err.message);
    }

}

//login page resubmition  page checking
const resubmition = async (req, res) => {
    try {
        if (req.session.eror) {
            res.render('users/index', { title: 'Express', eror: req.session.eror })
        }
        else {
            res.render('users/index', { title: 'Express' })
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

//sign-up page controller 
const signUpPage = async (req, res) => {
    const securePassword = async (pass) => {
        try {
            const passwordHash = await bycrypt.hash(pass, 10);
            return passwordHash;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    try {
        const sp = await securePassword(req.body.password);
        const user1 = new userModal({
            name: req.body.name,
            email: req.body.email,

            mobile: req.body.mobile,
            password: sp,
            is_admin: 0,


        })

        const userData = await user1.save();
        if (userData) {
            console.log(userData._id);
            // res.send(userData._id);
            verifyemail(req.body.name, req.body.email, userData._id);
            console.log("verification is send ");
            req.session.name = userData.name;
            req.session.userId = userData._id;
            req.session.email = userData.email;
            res.redirect('/dashbord')
        }
        else {
            res.render('/singup', { eror: "you fucked-up" })
        }
    }
    catch (error) {
        console.log(error.message + "this is");
        console.log(error.keyPattern);
        if (error.keyPattern.mobile) {
            req.session.eror = "mobile number has been taken ";
            res.redirect('/sing-up')
        }
        else if (error.keyPattern.email) {
            req.session.eror = "email has been taken ";
            res.redirect('/sing-up')

        }
        else {
            res.send("fuck you cunt")
        }

    }

}

//sign-up page resubmition page checking
const singUpResubmition = async (req, res) => {
    if (req.session.eror) {

        res.render('users/singup', { title: 'Express', eror: req.session.eror })
    }
    else {
        res.render('users/singup', { title: 'Express' })
    }
}

//dashbord controller
const dashbord = async (req, res) => {
    try {


        let products = [
            {
                svg: `ri-infinity-line`,
                title: `title`,
                p: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
            },
            {
                svg: `ri-microsoft-loop-fill`,
                title: `title`,
                p: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
            },
            {
                svg: `ri-mail-send-line`,
                title: `title`,
                p: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
            },
            {
                svg: `ri-ancient-gate-line`,
                title: `title`,
                p: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
            },
            {
                svg: ` ri-bar-chart-grouped-line`,
                title: `title`,
                p: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
            },
            {
                svg: `ri-shake-hands-fill`,
                title: `title`,
                p: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
            },

        ]
        console.log(req.session.name);
    const finddata =  await userModal.findOne({_id:req.session.userId})
    if(finddata){
        res.render('users/dashboard', { title: 'Express', products, user: req.session.name, email: req.session.email })

    }
    else{
        res.redirect('/logout');
    }
    }
    catch (err) {
        console.log(err.message);
    }
}

//logout controller
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        else {

            res.redirect('/login');
        }
    })
}

//verify controller
const verify = async (req, res) => {
    try {
        var updateuser = await userModal.updateOne({ _id: req.query.id }, { $set: { is_verified: 1 } })
        console.log(updateuser);
        res.send("verifyd")
    }
    catch (erro) {
        console.log(erro.message);
        res.send("erorr broooo")
    }
}



module.exports = {
    loginchecking,
    signUpPage,
    dashbord,
    logout,
    verify,
    resubmition,
    singUpResubmition
}
