const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const adminImgPath = "/uploads/admin" 
const RegisterSchema = mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    city : {
        type : String,
    },
    hobby : {
        type : Array,
    },
    gender : {
        type : String,
    },
    managerIds :{
        type : Array,
        ref : 'Manager Register',
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

const adminImgupload = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"../..",adminImgPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
}) 

RegisterSchema.statics.registerImg = multer({storage:adminImgupload}).single('image');
RegisterSchema.statics.regImgPath = adminImgPath;
const register = mongoose.model('Admin Register',RegisterSchema);

module.exports = register;