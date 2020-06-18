
//////////////////////////////////////////////////////////////
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
  require('dotenv').config();
const App = Express();
const Cookieparser = require('cookie-parser');
const Port = process.env.PORT||3000;
//////////////////////////////////////////////////////////
const IdentityRoute = require("./Routes/IdentityRoute");
const ApplicationRoute = require('./Routes/ApplicationRoute');
const JobRoute = require('./Routes/JobRoute');
const AuthHelper = require("./_Helpers/Auth_Helper");
/////////////////////////////////////////////////////

App.use(Cors());
App.use(Express.json());  
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({extended:true}));


/////////////////////API- ROUTE----------------
App.use("/Api/Identity", IdentityRoute );

App.use(Cookieparser());
App.use("/Api/Application", ApplicationRoute );


App.use("/Api/Job", JobRoute);



////////////////////global error handler-------
App.use(AuthHelper.ErrorHandler);  


/////////////page Not Found ---------------
App.get('*', function(req, res){ res.status(404).json("404 Page Not found ")});
App.post('*', function(req, res){ res.status(404).json("404 Page Not found ")});
App.put('*', function(req, res){ res.status(404).json("404 Page Not found ")});
App.delete('*', function(req, res){ res.status(404).json("404 Page  Not found ")});

////////Start serve connection --------
App.listen( Port ,(err)=>{ 
    if(!err){console.log("server is running on Port "+ Port);}
    })
