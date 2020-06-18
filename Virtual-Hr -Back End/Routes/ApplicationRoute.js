const Express = require('express');
const route = Express.Router();
const ApplicationController = require('../Controller/ApplicationController');
const AuthHelper = require('../_Helpers/Auth_Helper');


route.get('/GetAllApplication', AuthHelper.Authorization(), ApplicationController.GetAllApplication);
route.get('/GetAllApplicationById/:id', AuthHelper.Authorization(), ApplicationController.GetAllApplicationById);
route.post('/ApplyForJob/:id',AuthHelper.Authorization(), ApplicationController.CreateApplication);
route.post('/ManageApplications', AuthHelper.Authorization('Admin'), ApplicationController.ManageApplications);
route.post('/FilterApplicationsByAge/:id', AuthHelper.Authorization(), ApplicationController.FilterApplicationByAge);
route.post('/FilterApplicationsByLGA/:id',  AuthHelper.Authorization(), ApplicationController.FilterApplicationByLGA);
route.post('/FilterApplicationsByQualification/:id',  AuthHelper.Authorization(), ApplicationController.FilterApplicationQualification);
route.post('/FilterApplicationsByGender/:id',  AuthHelper.Authorization(), ApplicationController.FilterApplicationByGender);
route.post('/FilterApplicationsByYearsOfExperience/:id',  AuthHelper.Authorization(), ApplicationController.FilterApplicationByYearsOfExperience);
route.post('/FilterApplicationsByState/:id',  AuthHelper.Authorization(), ApplicationController.FilterApplicationByState);
route.get('/GetAllApplicationByJobId/:id', AuthHelper.Authorization(), ApplicationController.GetAllApplicationByJobId);
route.get('/GetAllApplicationByUserIdAndJobId/:id', AuthHelper.Authorization(), ApplicationController.GetApplicationByUserIdAndJobId);
route.get('/GetAllApplicationByUserId', AuthHelper.Authorization(), ApplicationController.GetAllApplicationByUserId);

module.exports = route;

