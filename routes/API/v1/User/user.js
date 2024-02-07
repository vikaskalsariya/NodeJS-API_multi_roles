const express = require("express");

const jwtAdimin = require('../../../../config/passport-jwt-strategy.js');

const UserRegister = require('../../../../models/User/Register.js');

const UserController = require('../../../../controllers/API/v1/User/userController.js')

const passport = require("passport");

const routes = express.Router();

routes.post('/Register',UserRegister.userregisterImg,UserController.register);

routes.post('/Login',UserController.Login);

routes.use('/',passport.authenticate('user',{failureRedirect:"user/failLogin"}),require('./permission.js'));


routes.get("/failLogin",(req,res)=>{
    return res.status(200).json({msg : "Login Faile",status : 0});
})
module.exports = routes;