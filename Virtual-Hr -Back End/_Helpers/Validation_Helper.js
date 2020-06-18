const Joi = require('joi');


exports.ValidateManageAccount = ( data)=>{

   const schema = Joi.object().keys({

     

      Password: Joi.string().required(),
      Old_Password: Joi.string().required(),
      ConfirmPassword: Joi.string().required(),

    

  });

  return schema;

}


exports.ValidateAuthenticationInput = ( data)=>{

   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      Email: Joi.string().email().required().trim(),

     

      Password: Joi.string().required(),

     

  });

  return schema;

}

exports.ValidateEmail = (data)=>{


   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      Email: Joi.string().email().required().trim(),
 

  });

  return schema;
}

exports.ValidateUserName = (data)=>{


   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      UserName: Joi.string().required().trim(),
 

  });

  return schema;
}

exports.ValidatePhoneNumber = (data)=>{


   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
      PhoneNumber: Joi.string().required().trim(),
 

  });

  return schema;
}



exports.ValidateInteger = ()=>{


   const schema =  Joi.number().required();
 

 
  return schema;
}


exports.ValidateCreateAccountModel = ( data)=>{

   const schema = Joi.object().keys({

      // email is required
      // email must be a valid email string
    

      LastName: Joi.string().required(),

      Email: Joi.string().email().required(),

      UserName: Joi.string().required(),

      PhoneNumber: Joi.string().required(),

      Address: Joi.string().required(),
      Password: Joi.string().required(),
      FirstName: Joi.string().required(),
      ConfirmPassword: Joi.string().valid(Joi.ref('Password')).required()

     

  });

  return schema;

}

exports.ValidateManageprofileAccountModel = ( data)=>{

  const schema = Joi.object().keys({

     // email is required
     // email must be a valid email string
   

     LastName: Joi.string().required(),

     
     UserName: Joi.string().required(),

     PhoneNumber: Joi.string().required(),

     Address: Joi.string().required(),
   
     FirstName: Joi.string().required(),

    

 });

 return schema;

}

exports.ValidateString = ()=>{


   const schema =  Joi.string().required().trim(); 

 
  return schema;
}


exports.ValidateRoleModel =  (data)=>{


  const schema = Joi.object().keys({

     // email is required
     // email must be a valid email string
     Role: Joi.string().required().trim(),


 });

 return schema;
}


exports.CreateJobSchema = (schema) =>{

 const CreateJobschema =  Joi.object().keys({

       CompanyName: Joi.string().required().trim(),

       JobTitle : Joi.string().required().trim(),


     //  PostedDate :Joi.string().required().trim(),


       ExpiringDate :Joi.string().required().trim(),

       Location : Joi.string().required().trim(),

       Discription : Joi.string().required().trim(),

       Requirement : Joi.string().required().trim(),

      JobType : Joi.string().required().trim(),

       Qualification : Joi.string().required().trim(),

       YearsOfExperience : Joi.string().required().trim(),

       JobField : Joi.string().required().trim(),

       Responsibility : Joi.string().required().trim(),

   });

   return CreateJobschema;
}

exports.ApplicationSchema = (schema) =>{

   const Applicationchema =  Joi.object().keys({

 
      
       FirstName: Joi.string().required().trim(),
       LastName : Joi.string().required().trim(),
     //  StateOfResidence: Joi.string().required().trim(),
       Email: Joi.string().required().trim(),
       Address:Joi.string().required().trim(),
       StateOfResidence:Joi.string().required().trim(),
       LGA:Joi.string().required().trim(),
        PhoneNumber : Joi.string().required().trim(),
         AlternativePhoneNumber: Joi.string().required().trim(),

Cv :Joi.string().required().trim(),

Age :Joi.number().required(),

Qualification: Joi.string().required().trim(),

YearsOfExperience :Joi.number().required(),

Gender: Joi.string().required().trim(),

NyscYear :Joi.string().required().trim(),

DateOfBirth: Joi.string().required().trim(),

InstitutionName :  Joi.string().required().trim(),

Program : Joi.string().required().trim(),

Course : Joi.string().required().trim(),

GraduationYear :  Joi.string().required().trim(),

ClassOfDegree : Joi.string().required().trim(),
CompanyName :  Joi.string().required().trim(),

WorkStartedDate :  Joi.string().required().trim(),

AcademicStartedDate :  Joi.string().required().trim(),

Position :  Joi.string().required().trim(),

Responsibility :  Joi.string().required().trim(),

WorkEndDate :  Joi.string().required().trim(),

AcademicEndDate :  Joi.string().required().trim(),


  });

  return Applicationchema;


}