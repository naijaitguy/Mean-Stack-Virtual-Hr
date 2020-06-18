const Express = require("express");
const Validation_Helper = require('../_Helpers/Validation_Helper');
const AuthHelper = require('../_Helpers/Auth_Helper');
const UserService= require('../Data Services/UserService');
const Joi = require('joi');

exports.GetAll = async (req,res,next)=>{ 
    
     await UserService.GetAllUsers()
     .then( Response=> Response? res.status(200).json(Response): res.status(404).json("No User Found"))
     .catch( err => next(err))

    };
exports.CreateAccount = async (req, res, next) =>{

    
    /////validate user input with joi-------------
Joi.validate(req.body, Validation_Helper.ValidateCreateAccountModel(req.body), async (err, Result )=>{

if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}

else{

    req.body.Role= "User";
    await   UserService.CreateAccount(req.body).then( Response=>{
           res.status(201).json({Mgs:" Registration Succeesful"});
       })
       .catch( err =>{ res.status(400).json({Mgs:err.message});} );



}

});

 
    }
exports.FindUserById = async (req, res, next)=> {

        /////validate user input with joi-------------
Joi.validate(req.params.id, Validation_Helper.ValidateString(), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    
else{

    const Id = req.params.id;

    await UserService.GetUserById(Id)
    .then(  Response => Response? res.status(200).json(Response) : res.status(404).json("User Not Found") )


    .catch( err=> next("User Not Found"));
    

}

    });
   

}

exports.FindUserByEmail = async (req, res,next)=>{

            /////validate user input with joi-------------
Joi.validate(req.body, Validation_Helper.ValidateEmail(req.body), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    
else{

    const Email = req.body.Email;

    await UserService.GetUserByEmail(Email)
    .then(Response=> Response? res.status(200).json("Email Found") : res.status(404).json("User Not Found") )
    .catch( err => next(err));


}

    });

   
};

exports.FindUserByUserName = async (req, res,next)=>{


            /////validate user input with joi-------------
Joi.validate(req.body, Validation_Helper.ValidateUserName(req.body), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    

    else{
        const UserName = req.body.UserName;

        await UserService.GetUserByUserName(UserName)
        .then(Response=> Response? res.status(200).json("User Name Found") : res.status(404).json("User Not Found") )
        .catch( err => next(err));

    }
    });
   


};

exports.FindUserByPhoneNumber = async (req, res,next)=>{


    /////validate user input with joi-------------
Joi.validate(req.body, Validation_Helper.ValidatePhoneNumber(req.body), async (err, Result )=>{

if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}


else{
const PhoneNumber = req.body.PhoneNumber;

await UserService.GetUserByPhoneNumber(PhoneNumber)
.then(Response=> Response? res.status(200).json("Phone Number Found") : res.status(404).json("User Not Found") )
.catch( err => next(err));

}
});



};


exports.Authenticate = async (req, res, next) => {

        /////validate user input with joi-------------
 Joi.validate(req.body, Validation_Helper.ValidateAuthenticationInput(req.body),  async (err, Result )=>{

            if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}

            else{   await UserService.Authenticate(req.body)
                .then(Response=> { if(Response)
                   { 
                   res.cookie('refreshtoken', Response.RefreshToken, { httpOnly: true, path:'/refresh_token'});
                    res.status(200).json(Response) }else {res.status(400).json("Ivalid Login")}
                   })
                .catch(  err =>next(err));
            }
            
            });
   
    
};

exports.AuthenticateAdmin = async (req, res, next) => {

    /////validate user input with joi-------------
Joi.validate(req.body, Validation_Helper.ValidateAuthenticationInput(req.body),  async (err, Result )=>{

        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}

        else{   await UserService.AuthenticateAdmin(req.body)
            .then(Response=> { if(Response)
               { 
               res.cookie('refreshtoken', Response.RefreshToken, { httpOnly: true, path:'/refresh_token'});
                res.status(200).json(Response) }else {res.status(400).json("Ivalid Login")}
               })
            .catch(  err =>next(err));
        }
        
        });


};

exports.RefreshToken =  async (req,res, next)=>{

    if(req.body.refreshtoken  !== null)
     {   token = req.body.refreshtoken  } 
     
 else{  res.status(400).json(" Refresh Token is Empty ");}

   await AuthHelper.VerifyRefreshToken(token)
  .then(Response =>{
    res.cookie('refreshtoken', Response.RefreshToken, { httpOnly: true, path:'/refresh_token'});
    res.status(200).json(Response)})
  .catch( err => next(err))

 

};
exports.ManageAccount = async (req ,res, next) =>{
  /////validate user input with joi-------------
  Joi.validate(req.body, Validation_Helper.ValidateManageAccount(req.body), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    
    else{   const Id = req.params.id;
        const CurrentUserId = req.user.Id;
        
        if(Id !== CurrentUserId){ res.status(401).json("Access Denied") }
        const Model = req.body;
        await UserService.ManageAccount(Id, Model)
        .then( Response => res.status(200).json("Update Successful") )
        .catch( err => next(err) );}

    });
    

}

exports.ManageProfile = async (req ,res, next ) =>{
  /////validate user input with joi-------------
  Joi.validate(req.body, Validation_Helper.ValidateManageprofileAccountModel(req.body), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    

    else{

        const Id = req.params.id;
const CurrentUserId = req.user.Id;

if(Id !== CurrentUserId){ res.status(401).json("Access Denied") }

await UserService.ManageProfile(Id, req.body)
.then(Response => res.status(200).json("Profile Updated Successfully"))
.catch(err => next(err));
    }
    });


}

exports.ManageUserRole = async (req ,res, next ) =>{
    /////validate user input with joi-------------
    Joi.validate(req.body, Validation_Helper.ValidateRoleModel(req.body), async (err, Result )=>{
  
      if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}

      else{  

        const Id = req.params.id;
        const CurrentUserRole = req.user.role;
        
       if(CurrentUserRole !== "Director"){ res.status(401).json("Access Denied Only Diresctor Have Access") }
        
        await UserService.MnageUserRole(Id, req.body)
        .then(Response => res.status(200).json("User Role  Updated Successfully"))
        .catch(err => next(err));
      }
      
      });

  
  }

exports.CreateStaffAccount = async (req, res) =>{

    
    /////validate user input with joi-------------
Joi.validate(req.body, Validation_Helper.ValidateCreateAccountModel(req.body), async (err, Result )=>{

if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}


else{

    req.body.Role= "Admin";
    await   UserService.CreateAccount(req.body).then( Response=>{
           res.status(201).json({Mgs:" Registration Succeesful"});
       })
       .catch( err => {  console.error(err); res.status(500).json({Mgs:" Internal Server Error ", err})});

}
});

 

    }


 exports.DeleteUser = async (req ,res, next ) =>{
      
      const Id = req.params.id;
      const CurrentUserRole = req.user.role;
      
     if(CurrentUserRole !== "Director"){ res.status(401).json("Access Denied Only Diresctor Have Access") }else{
      
      await UserService.DeleteUser(Id)
      .then(Response => res.status(200).json("User Deleted"))
      .catch(err => next(err));
      
      }
    }

exports.Log_Out = async (req, res, next) =>{

    const CurrentUserId = req.user.Id;
   UserService.Log_Out(CurrentUserId)
   .then(  Response => res.status(200).json("Log Out Successfull"))
   .catch( err => next(err));
}