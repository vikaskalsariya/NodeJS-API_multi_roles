const express = require("express");

const jwtAdmin = require('../../../../config/passport-jwt-strategy.js');

const AdminRegister = require('../../../../models/Admin/Register.js');
const AdminController = require("../../../../controllers/API/v1/Admin/adminController.js");
const passport = require("passport");
const routes = express.Router();

routes.post('/Register',AdminRegister.registerImg,AdminController.register);

routes.post('/Login',AdminController.Login);

routes.use('/',passport.authenticate('jwt',{failureRedirect:"admin/failLogin"}),require('./permission.js'));


routes.get("/failLogin",(req,res)=>{
    return res.status(200).json({msg : "Login Faile",status : 0});
})
module.exports = routes;