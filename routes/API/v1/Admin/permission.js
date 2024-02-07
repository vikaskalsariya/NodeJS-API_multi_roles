const express = require('express');

const Admin = require('../../../../models/Admin/Register.js');
const Manager = require('../../../../models/Manager/Register.js');

const routes = express.Router();

const AdminController = require('../../../../controllers/API/v1/Admin/adminController.js');

const ManagerController = require('../../../../controllers/API/v1/Manager/managerController.js');

routes.get('/Profile',AdminController.profile);

routes.put('/editAdminProfile',Admin.registerImg,AdminController.editAdminProfile);

routes.get('/AllAdminData',AdminController.AllAdminData);

routes.get('/AllManagerData',AdminController.AllManagerData);


// ----------------- Manager Rgister -----------------
routes.post('/managerRegister',Manager.menregisterImg,ManagerController.manRgister);

module.exports = routes;