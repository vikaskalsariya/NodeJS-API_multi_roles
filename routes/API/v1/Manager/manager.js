const express = require("express");

const jwtManager = require('../../../../config/passport-jwt-strategy.js');

const ManagerRegister = require('../../../../models/Admin/Register.js');
const ManagerController = require("../../../../controllers/API/v1/Manager/managerController.js");

const passport = require("passport");

const routes = express.Router();

routes.post('/Login',ManagerController.Login);

routes.use('/',passport.authenticate('manager',{failureRedirect:"manager/failLogin"}),require('./permission.js'));


routes.get("/failLogin",(req,res)=>{
    return res.status(200).json({msg : "Login Faile",status : 0});
})
module.exports = routes;