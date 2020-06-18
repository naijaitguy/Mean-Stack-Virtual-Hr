
require('dotenv').config();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = process.env.ACCESSTOKENSECRET;

const Db = require('../Config Files/DbConfig');




exports.VerifyRefreshToken = async (RefreshToken) =>{

    ////verify refre token 
   payload = jwt.verify(RefreshToken, process.env.REFRESHTOKENSECRET ) ;
  
  /////////////check if refresh token is still in our databse----------
  
    const Validrefreshtokenuser = await Db.UserRepository.findOne({RefreshToken:RefreshToken});
  if(Validrefreshtokenuser == null){ throw Error("Invalid Token Access")}
  else{
  
  //return Validrefreshtokenuser;
  
   const AccessToken = this.CreateAccesstoken(Validrefreshtokenuser);
  
   const RefreshToken = this.CreateRefreshtoken(Validrefreshtokenuser);
    Validrefreshtokenuser.RefreshToken = RefreshToken;
    Validrefreshtokenuser.save();
  
    return ({AccessToken, RefreshToken});
    
   
  
  }
  
  
  
  }

  
  
exports.Authorization =  (roles = [])=> {


    // roles param can be a single role string (e.g. Role.User or 'User') 
     // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
     if (typeof roles === 'string') {
       roles = [roles];
   }
 
   return [
       // authenticate JWT token and attach user to request object (req.user)
       expressJwt({secret}), 
 
       // authorize based on user role
       async  (req, res, next) => {
 
         const User = await Db.UserRepository.findById(req.user.Id);
      if (!User || roles.length && !roles.includes(req.user.role)) {
               // user's role is not authorized
               return res.status(401).json({ message: 'Unauthorized' });
           }
 
           // authentication and authorization successful
           next();
       }
   ];
 
 }
 
 
 exports.ErrorHandler =  (err, req, res, next) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }
 
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }
 
    // default to 500 server error
    return res.status(500).json({ message: err.message });
 }
 

  exports.CreateAccesstoken = (User) =>{

    const Token = jwt.sign({ Id:User._id , 
      Email: User.Email, role:User.Role,
       FullName:User.FirstName  }, secret, { expiresIn:'10m'} );
    return Token;
  }  



  
  exports.CreateRefreshtoken = (User) =>{
  
    const RefreshToken = jwt.sign({ sub:User._id , Email: User.Email }, process.env.REFRESHTOKENSECRET, {expiresIn:'7d'});
    return  RefreshToken;
  }
  