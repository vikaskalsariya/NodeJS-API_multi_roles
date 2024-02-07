const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const managerImgPath = "/uploads/manager" 
const RegistermanSchema = mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    gender : {
        type : String,
    },
    adminid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin Register',
    },
    image : {
        type : String,
    },
    isActive : {
        type : Boolean,
    },
    createDate : {
        type : String,
    },
    updateDate : {
        type : String,
    },
});

const managerImgupload = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"../..",managerImgPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
}) 

RegistermanSchema.statics.menregisterImg = multer({storage:managerImgupload}).single('image');
RegistermanSchema.statics.menregImgPath = managerImgPath;
const register = mongoose.model('Manager Register',RegistermanSchema);

module.exports = register;