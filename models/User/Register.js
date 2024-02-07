const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const userImgPath = "/uploads/user" 
const RegisterUserSchema = mongoose.Schema({
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

const userImgupload = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"../..",userImgPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
}) 

RegisterUserSchema.statics.userregisterImg = multer({storage:userImgupload}).single('image');
RegisterUserSchema.statics.userregImgPath = userImgPath;
const register = mongoose.model('User Register',RegisterUserSchema);

module.exports = register;