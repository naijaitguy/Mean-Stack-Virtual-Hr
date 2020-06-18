const Express = require("express");
const router = Express.Router();
const ValidationHelper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');

const IdentityRoute = require('../Controller/IdentityController');



///////Get All-----------------------
router.get("/GetAll", AuthHelper.Authorization([ 'Admin', 'Director' ]), IdentityRoute.GetAll);
router.get("/GetUserById/:id", AuthHelper.Authorization(), IdentityRoute.FindUserById);
router.post("/GetUserByEmail", IdentityRoute.FindUserByEmail);
router.post("/GetUserByUserName", IdentityRoute.FindUserByUserName);
router.post("/GetUserByPhoneNumber", IdentityRoute.FindUserByPhoneNumber);
router.post("/CreateAccount", IdentityRoute.CreateAccount);
router.post("/CreateStaffAccount", IdentityRoute.CreateStaffAccount);
router.post("/Authenticate", IdentityRoute.Authenticate);
router.post("/AuthenticateAdmin", IdentityRoute.AuthenticateAdmin);
router.post("/Refresh_Token", IdentityRoute.RefreshToken);
router.post("/ManageAccount/:id", AuthHelper.Authorization(), IdentityRoute.ManageAccount);
router.post("/ManageProfile/:id", AuthHelper.Authorization(), IdentityRoute.ManageProfile);
router.post("/ManageUserRole/:id", AuthHelper.Authorization(), IdentityRoute.ManageUserRole);
router.delete("/Log_Out", AuthHelper.Authorization(),  IdentityRoute.Log_Out);
router.delete("/DeleteUser/:id", AuthHelper.Authorization(), IdentityRoute.DeleteUser);


module.exports = router;
