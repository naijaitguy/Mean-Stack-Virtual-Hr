const DbConnection = require("../Config Files/DbConfig");
require('dotenv').config();
const Mongoose = require("mongoose");
const Bcrypt = require('bcrypt');
const UserRepo = require('../SchemaModels/UserSchema');
const AuthHelper = require('../_Helpers/Auth_Helper');




exports.GetAllUsers= async ()=>{

    
    const Users = await  UserRepo.find();
    
    return  Users;
};

exports.GetUserById= async (Id)=>{

const User = await UserRepo.findById(Id);

return User;


};

exports.GetUserByEmail= async ( Email)=>{

    return await UserRepo.findOne({Email});

};

exports.GetUserByUserName= async ( Username)=>{

    return await UserRepo.findOne({UserName:Username});
};


exports.GetUserByPhoneNumber= async ( PhoneNumber)=>{

    return await UserRepo.findOne({PhoneNumber:PhoneNumber});
};


exports.MnageUserRole= async (id, Model)=>{

    const User = await UserRepo.findById(id);

    if(User == null){ throw Error("User Not Found");}

    User.Role = Model.Role;
    User.save();



};


exports.CreateAccount = async (UserModel) =>{

try{ 

    const UserNameUser = await UserRepo.findOne({UserName:UserModel.Username});
    const EmailUser =  await UserRepo.findOne({Email:UserModel.Email});
    const PhoneNumberUser = await UserRepo.findOne({PhoneNumber:UserModel.PhoneNumber});

   if(EmailUser !== null){ throw Error("Email Already Exist");}

   if(UserNameUser !== null){ throw Error("UserName Already Exist ");}

   if(PhoneNumberUser !== null){ throw Error("Phone Number Already Exist");}
    const User = new UserRepo(UserModel);

    User.Password = Bcrypt.hashSync(UserModel.Password,10);
 
    await User.save();

}
catch(err)
{ console.log(err);
    throw  (err); }
   

}
exports.Authenticate = async (LoginModel) =>{
Email= LoginModel.Email;
Password = LoginModel.Password;

const User = await UserRepo.findOne({Email:Email});

if(User  && Bcrypt.compareSync(Password,User.Password)){

    if(User.Role !== "User"){ throw Error("Invalid Login");}
   const AccesToken = AuthHelper.CreateAccesstoken(User);
   const RefreshToken = AuthHelper.CreateRefreshtoken(User);
   User.RefreshToken = RefreshToken;
   User.LastLogin = Date();
   User.save();

    return {ID:User._id, Role:User.Role, Email:User.Email, UserName: User.UserName, AccessToken: AccesToken,RefreshToken:User.RefreshToken};
}


}

exports.AuthenticateAdmin = async (LoginModel) =>{
try{     Email= LoginModel.Email;
    Password = LoginModel.Password;
    
    const User = await UserRepo.findOne({Email:Email});
    
    if(User  && Bcrypt.compareSync(Password,User.Password)){
    
        if(User.Role === "User"){ throw Error("Invalid Login");}
       const AccesToken = AuthHelper.CreateAccesstoken(User);
       const RefreshToken = AuthHelper.CreateRefreshtoken(User);
       User.RefreshToken = RefreshToken;
       User.LastLogin = Date();
       User.save();
    
        return {ID:User._id,Role:User.Role, Email:User.Email, UserName: User.UserName, AccessToken: AccesToken,RefreshToken:User.RefreshToken};
    }
    }

catch(err)
{
    console.log(err);
}
    
    }

exports.ManageAccount = async ( id, Model) =>{

  const USertoUpdate = await  UserRepo.findById(id);

  if(USertoUpdate === null){ throw Error("User Not Found");  }

  if(  Bcrypt.compareSync(Model.Old_Password,USertoUpdate.Password) == false ){ throw Error("Invalid Password");}

const Hashpassword = Bcrypt.hashSync(Model.Password, 10);

 USertoUpdate.Password = Hashpassword;
 USertoUpdate.LastUpdated = Date();
 USertoUpdate.save();


}

exports.ManageProfile = async ( id, Model) =>{


 const USertoUpdate = await  UserRepo.findById(id);

  if(USertoUpdate === null){ throw Error("User Not Found");  }

  const UserName = await UserRepo.findOne({UserName:Model.UserName});

  if(UserName !== null && USertoUpdate.UserName !== Model.UserName){ throw Error("User Name Already exist");}

 USertoUpdate.FirstName = Model.FirstName;
 USertoUpdate.LastName = Model.LastName;
 USertoUpdate.UserName = Model.UserName;
 USertoUpdate.Address = Model.Address;
 USertoUpdate.PhoneNumber = Model.PhoneNumber
 USertoUpdate.UpdatedDate = Date();
 USertoUpdate.save();


  
  }


  exports.DeleteUser= async (id)=>{

    const User = await UserRepo.findById(id);

    if(User == null){ throw Error("User Not Found");}

   User.remove();


};

exports.Log_Out = async (Id) => {


const UsertoLogOut = await UserRepo.findById(Id);

if (UsertoLogOut === null ){ throw Error('User Not Foundn ');}else{

    UsertoLogOut.RefreshToken = null;

     UsertoLogOut.save();

     return ("Logout");


}

}
