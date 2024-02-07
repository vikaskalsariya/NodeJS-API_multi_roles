const bcrypt = require('bcrypt');
const jwtAdmin = require("jsonwebtoken");
const Manager = require("../../../../models/Manager/Register.js");
const Admin = require("../../../../models/Admin/Register.js");
const nodemailer = require("nodemailer");

//------------------------ Manager Registrer By admin -------------------
module.exports.manRgister = async (req, res) => {
    try {
        let ManagerData = await Manager.findOne({email : req.body.email});
        if(!ManagerData)
        {

        let imgPath = '';
        if (req.body) {
            imgPath = Manager.menregImgPath + "/" + req.file.filename;
        }
        if (req.body) {
            let ManagerPass = req.body.password;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.adminid = req.user.id;
            req.body.image = imgPath;
            req.body.isActive = true;
            req.body.createDate = new Date().toLocaleDateString();
            req.body.updateDate = new Date().toLocaleDateString();
            let manData = await Manager.create(req.body);
            if(manData)
            {
                // send  email to manager 
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                      user: "axyz44670@gmail.com",
                      pass: "whzxjgyqoqstsphi",
                    },
                  });

                    // send mail with defined transport object
                    const info = await transporter.sendMail({
                      from: '"axyz44670@gmail.com', // sender address
                      to: req.body.email, // list of receivers
                      subject: "Registration By Admin ", // Subject line
                      text: `User name : ${req.body.username}\nEmail :${req.body.email}\nPassword : ${ManagerPass}`, // html body
                    });

                let AdminData = await Admin.findById(req.user.id);
                if(AdminData)
                {
                    AdminData.managerIds.push(manData.id);
                    let updateAdmin = await Admin.findByIdAndUpdate(req.user.id,AdminData);
                    console.log(updateAdmin)
                    if(updateAdmin)
                    {
                        return res.status(200).json({ msg: "Manager register successfully", status: 1 });
                    }
                    else 
                    {
                        return res.status(400).json({ msg: "Admin n ot Updated", status: 1 });
                    }
                }
                else 
                {
                    return res.status(200).json({ msg: "Admin data not found in manager register by Admin", status: 0 });
                }
            } 
            else 
            {
                return res.status(200).json({ msg: "Managar data not store in manager register by Admin", status: 0 });
            }
        }
        else {
            return res.status(200).json({ msg: "From data not found in manager register by Admin", status: 0 });
        }
    }

        else 
        {
            return res.status(200).json({msg:"Email alredy register",status : 0});
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Somthis wrong in manager register by Admin"+err, status: 0 });
    }
}

//----------------------------- Manager Login ---------------------------
module.exports.Login = async (req, res) => {
    try {
        console.log(req.body)
        if (req.body) {
            let ChackMail = await Manager.findOne({email:req.body.email});
            if (ChackMail) {
                if(await bcrypt.compare(req.body.password,ChackMail.password))
                {
                    let token = jwtAdmin.sign({manager : ChackMail},'managerregister',{expiresIn : '1h'});
                    return res.status(200).json({ msg: "Login successfullty", status: 1 ,token : token});
                }
                else 
                {
                    return res.status(200).json({ msg: "Password is not true", status: 0 });
                }
            }
            else {
                return res.status(200).json({ msg: "record not found", status: 0 });
            }
        }
        else {
            return res.status(200).json({ msg: "Login data not found", status: 0 });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Somthing wrong in manager login", status: 0 });
    }
}

//----------------------------- Profile ---------------------------
module.exports.profile = async (req,res)=>{
    try
    {
        let data = await Manager.findById(req.user.id).populate("adminid").exec();
        if(data)
        {
            return res.status(200).json({msg:"Admin profile data here", status : 1,ManagerData : data});
        }
        else{
            return res.status(200).json({msg:"Data not found", status : 0});
        }
    }
    catch(err)
    {
        return res.status(400).json({msg:"Somthig wron in Manager profile",statyus : 0});
    }
};

//------------------------ Edit manager Profile -------------------------
module.exports.editManagerProfile = async(req,res)=>{
    try{
        if(req.body)
        {
            if(req.file)
            {
                req.body.image = Manager.menregImgPath+"/"+req.file.filename;    
            }
            else 
            {
                req.body.image = req.user.image
            }
            req.body.updateDate = new Date().toLocaleDateString();
            let data = await Manager.findByIdAndUpdate(req.user.id,req.body);
            if(data)
            {
                console.log(data)
                return res.status(200).json({msg:"Admin Data Updated successfully",status:1});
            }
            else 
            {
                return res.status(200).json({msg:"data not found in Edit Admin profile",statyus : 0});
            }
        }
        else 
        {
            return res.status(200).json({msg:"Form data not found in Edit Admin profile",statyus : 0});
        }
    }
    catch(err)
    {
        console.log(err)
        return res.status(400).json({msg:"Somthig wron in Edit Admin profile",statyus : 0});
    }
}