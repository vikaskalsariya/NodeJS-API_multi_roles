const express = require('express');

const Manager = require('../../../../models/Manager/Register.js');

const ManagerController = require('../../../../controllers/API/v1/Manager/managerController.js');

const routes = express.Router();

routes.get('/Profile',ManagerController.profile);

routes.put('/editManagerProfile',Manager.menregisterImg,ManagerController.editManagerProfile);

// routes.get('/AllManagerData',AdminController.AllManagerData);


module.exports = routes;