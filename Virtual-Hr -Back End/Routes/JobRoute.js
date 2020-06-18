const Express = require('express');
const route = Express.Router();
const JobController = require('../Controller/JobController');
const Auth_Helper = require('../_Helpers/Auth_Helper');



route.get('/GetAllJobs', JobController.GetAllJobs);
route.get('/GetJobById/:id', JobController.GetJobById);
route.post('/CreateJob', Auth_Helper.Authorization("Admin") ,JobController.CreateJob);





module.exports = route;



