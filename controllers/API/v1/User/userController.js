const bcrypt = require('bcrypt');
const jwtAdmin = require("jsonwebtoken");
const User = require('../../../../models/User/Register.js')
//------------------------ User Registrer  -------------------
module.exports.register = async (req, res) => {
    try {
        let UserData = await User.findOne({ email: req.body.email });
        if (!UserData) {
            let imgPath = '';
            if (req.body) {
                imgPath = User.userregImgPath + "/" + req.file.filename;
            }
            if (req.body) {
                if (req.body.password == req.body.cPass) {
                    req.body.password = await bcrypt.hash(req.body.password, 10);
                    req.body.image = imgPath;
                    req.body.isActive = true;
                    req.body.createDate = new Date().toLocaleDateString();
                    req.body.updateDate = new Date().toLocaleDateString();
                    let userData = await User.create(req.body);
                    if (userData) {
                        return res.status(200).json({ msg: "User register successfully", status: 1 });
                    }
                    else {
                        return res.status(200).json({ msg: "From data not found in manager register by Admin", status: 0 });
                    }
                }
                else {
                    return res.status(200).json({ msg: "Password and confform password are not match", status: 0 });

                }
            }

            else {
                return res.status(200).json({ msg: "Email alredy register", status: 0 });
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "Somthis wrong in manager register by Admin" + err, status: 0 });
    }
}

//----------------------------- User Login ---------------------------
module.exports.Login = async (req, res) => {
    try {
        console.log(req.body)
        if (req.body) {
            let ChackMail = await User.findOne({ email: req.body.email });
            if (ChackMail) {
                if (await bcrypt.compare(req.body.password, ChackMail.password)) {
                    let token = jwtAdmin.sign({ user: ChackMail }, 'userregister', { expiresIn: '1h' });
                    return res.status(200).json({ msg: "Login successfullty", status: 1, token: token });
                }
                else {
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

// //-----------------------------User Profile ---------------------------
module.exports.profile = async (req, res) => {
    try {
        let data = await User.findById(req.user.id);
        if (data) {
            return res.status(200).json({ msg: "User profile data here", status: 1, UserData: data });
        }
        else {
            return res.status(200).json({ msg: "Data not found", status: 0 });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Somthig wron in User profile", statyus: 0 });
    }
};

// //------------------------ Edit User Profile -------------------------
module.exports.editUserProfile = async(req,res)=>{
    try{
        if(req.body)
        {
            if(req.file)
            {
                req.body.image = User.userregImgPath+"/"+req.file.filename;
            }
            else
            {
                req.body.image = req.user.image
            }
            req.body.updateDate = new Date().toLocaleDateString();
            let data = await User.findByIdAndUpdate(req.user.id,req.body);
            if(data)
            {
                return res.status(200).json({msg:"User Data Updated successfully",status:1});
            }
            else
            {
                return res.status(200).json({msg:"data not found in Edit User profile",statyus : 0});
            }
        }
        else
        {
            return res.status(200).json({msg:"Form data not found in Edit User profile",statyus : 0});
        }
    }
    catch(err)
    {
        console.log(err)
        return res.status(400).json({msg:"Somthig wron in Edit User profile",statyus : 0});
    }
}