const express = require('express');

const User = require('../../../../models/User/Register.js');

const UserController = require('../../../../controllers/API/v1/User/userController.js');

const routes = express.Router();

routes.get('/Profile',UserController.profile);

routes.put('/editUserProfile',User.userregisterImg,UserController.editUserProfile);

// routes.get('/AllManagerData',AdminController.AllManagerData);


module.exports = routes;