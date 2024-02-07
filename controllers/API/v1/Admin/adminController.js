const AdminRegister = require('../../../../models/Admin/Register');
const ManagerRegister = require('../../../../models/Manager/Register.js');
const bcrypt = require('bcrypt');
const jwtAdmin = require("jsonwebtoken");

//----------------------------- Admin Register ---------------------------
module.exports.register = async (req, res) => {
    try {
        let imgPath = '';
        if (req.file) {
            imgPath = AdminRegister.regImgPath + "/" + req.file.filename;
        }
        if (req.body) {
            let check = await AdminRegister.findOne({ email: req.body.email });
            if (check) {
                return res.status(400).json({ msg: "Email already existed plz try another email", status: 0 });
            }
            else {
                if (req.body.password == req.body.cPass) {
                    req.body.image = imgPath;
                    req.body.isActive = true;
                    req.body.createDate = new Date().toLocaleDateString();
                    req.body.updateDate = new Date().toLocaleDateString();
                    req.body.password = await bcrypt.hash(req.body.password, 10);
                    let data = await AdminRegister.create(req.body);
                    if (data) {
                        return res.status(200).json({ msg: "Register data store successfully", status: 1 });
                    }
                    else {
                        return res.status(200).json({ msg: "Register data is note store in DB", status: 0 });
                    }
                }
                else {
                    return res.status(200).json({ msg: "Password and confirm password are not match", status: 0 });
                }
            }
        }
        else {
            return res.status(400).json({ msg: "Register Data not found", status: 0 });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ msg: err, status: 0 });
    }
}

//----------------------------- Admin Login ---------------------------
module.exports.Login = async (req, res) => {
    try {
        if (req.body) {
            let ChackMail = await AdminRegister.findOne({email:req.body.email});
            if (ChackMail) {
                if(await bcrypt.compare(req.body.password,ChackMail.password))
                {
                    let token = jwtAdmin.sign({admin : ChackMail},'adminregister',{expiresIn : '1h'});
                    return res.status(200).json({ msg: "Login successfullty", status: 1 ,token : token});
                }
                else 
                {
                    return res.status(200).json({ msg: "Password is not true", status: 0 });
                }
                // console.log(req.body);
                // console.log(req.params.id);
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
        return res.status(400).json({ msg: "Somthing wrong in admin login", status: 0 });
    }
}

//----------------------------- Profile ---------------------------
module.exports.profile = async (req,res)=>{
    try
    {
        let data = await AdminRegister.findById(req.user.id);
        if(data)
        {
            return res.status(200).json({msg:"Admin profile data here", status : 1,AdminData : data});
        }
        else{
            return res.status(200).json({msg:"Data not found", status : 0});
        }
    }
    catch(err)
    {
        return res.status(400).json({msg:"Somthig wron in Admin profile",statyus : 0});
    }
};

//------------------------ Edit Admin Profile -------------------------
module.exports.editAdminProfile = async(req,res)=>{
    try{
        if(req.body)
        {
            if(req.file)
            {
                req.body.image = AdminRegister.regImgPath+"/"+req.file.filename;    
            }
            else 
            {
                req.body.image = req.user.image
            }
            req.body.updateDate = new Date().toLocaleDateString();
            let data = await AdminRegister.findByIdAndUpdate(req.user.id,req.body);
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

//------------------------- All Admin Data -------------------
module.exports.AllAdminData = async (req,res)=>{
    try{
        let data = await AdminRegister.find({}).populate("managerIds").exec();
        if(data)
        {
            return res.status(200).json({msg : "All Admin Data here",status : 1,AllAdmin : data});
        }
        else 
        {
            return res.status(400).json({msg : "Data not found in All Admin Data ",status : 0});
        }
    }
    catch(err)
    {
        return res.status(400).json({msg : "Somthis worn in All Admin Data ",status : 0});
    }
}

//------------------------- All Mnager Data -------------------
module.exports.AllManagerData = async (req,res)=>{
    try{
        let data = await ManagerRegister.find({}).populate("adminid").exec();
        if(data)
        {
            return res.status(200).json({msg : "All Manager Data here",status : 1,AllManager : data});
        }
        else 
        {
            return res.status(400).json({msg : "Data not found in All Manager Data ",status : 0});
        }
    }
    catch(err)
    {
        return res.status(400).json({msg : "Somthis worn in All Manager Data ",status : 0});
    }
}
