const Db = require('../Config Files/DbConfig');


exports.GetAllApplications =  async () => {

try{

    const Applications =   await Db.ApplicationRepository.find();
    if(Applications.length === 0 ){ throw Error('Applications Not Found');}
    else{

        return Applications;
    }
 }

catch(err)
{

    console.error(err);
}


};

exports.GetAllApplicationById =  async (Id) => {
    try{

        const Applications =   await Db.ApplicationRepository.findById(Id);
        if(Applications === null ){ throw Error('Applications Not Found');}
        else{
    
            return Applications;
        }
     }
    
    catch(err)
    {
    
        console.error(err);
    }
    

};

exports.GetAllApplicationByUserId =  async (User_Id) => {
    try{

        const Applications =   await Db.ApplicationRepository.find({User:User_Id});

        if(Applications.length === 0 ){ throw Error('Applications Not Found');}
        else{
    
            return Applications;
        }
     }
    
    catch(err)
    {
    
        throw (err);
    }
    

};

exports.GetApplicationByUserIdAndJobId =  async (User_Id , Job_Id) => {
    try{

        const Applications =   await Db.ApplicationRepository.find({User:User_Id , Job:Job_Id});

        if(Applications.length === 0 ){ throw Error('Applications Not Found');}
        else{
    
            return Applications;
        }
     }
    
    catch(err)
    {
    
        throw (err);
    }
    

};


exports.GetAllApplicationByJobId =  async (Id) => {
    try{

        const Applications =   await Db.ApplicationRepository.find({Job:Id});

        if(Applications.length === 0 ){ throw Error('Applications Not Found');}
        else{
    
            return Applications;
        }
     }
    
    catch(err)
    {
    
        throw (err);
    }
    

};
exports.CreateApplication = async (Job_Id, UserId, Model, WorkModel, AcademicModel) => {

  

try{
const CurerentDate = new  Date();
const Job = await Db.JobRepository.findById(Job_Id);
if(Job === null  || Job.ExpiringDate < CurerentDate ){ throw  Error( CurerentDate+" Job Already Expires");}
const Application = new Db.ApplicationRepository(Model);
Application.User = UserId;
Application.Job = Job_Id;
Application.Contact =  Model;
Application.Name = Model;
 await Application.save();

 const AppId = await Db.ApplicationRepository.findOne({Job:Job_Id});

 if(AppId){


   const Institution =  new Db.AcademicRepository( AcademicModel);
   Institution.ApplicationId = AppId._id;

   const WorkExperience = new Db.WorkExRepository(WorkModel);
  WorkExperience.ApplicationId = AppId._id;

   await Institution.save();
   await WorkExperience.save();




 }

return ('Created');
    
 }

catch(err)
{

  throw Error (err);
}

};

exports.GetApplicationByLGA = async ( Id, LGA) =>{

    
    try{

        const Applicants = await Db.ApplicationRepository.find({ Job:Id , "Contact.LGA": LGA});
   
        if(Applicants.length === 0 ){ throw Error('Applications Not Found');}
        else{
                return Applicants
        }
     }
    
    catch(err)
    {
    
throw Error( err);
    
    }
 };

 
 exports.GetApplicationByAge = async (Id, Age) =>{


    try{

        const Applicants = await Db.ApplicationRepository.find({Job:Id , Age: {$lte:Age}});
        console.log(Applicants);
        if(Applicants.length ==  0  )  {throw Error('Applications Not Found');}
        else{
    
            return Applicants;
        }
     }
    
    catch(err)
    {
    
      throw Error(err);
    }
    
 };

 
 exports.GetApplicationByQuailfication = async ( Id , Qualification) =>{


    try{

        const Applicants = await Db.ApplicationRepository.find({ Job:Id, Qualification:Qualification});
        if(Applicants.length === 0 ){ throw Error('Applications Not Found');}
        else{
    
            return Applicants;
        }
     }
    
    catch(err)
    {
    
        throw Error( err);
    }

 };

 
 exports.GetApplicatinByExperience = async ( Id , Years) =>{

    try{

        const Applicants = await Db.ApplicationRepository.find({Job:Id , YearsOfExperience:{$gte: Years}});
       // console.log(Applicants);
        if(Applicants.length ==  0  )  {throw Error('Applications Not Found');}
        else{
    
            return Applicants;
        }
     }
    
    catch(err)
    {
    
      throw Error(err);
    }
 };

 
 exports.GetApplicatinByGender = async ( Id, Gender) =>{


try{

    const Applicants = await Db.ApplicationRepository.find({Job:Id, Gender:Gender});
    if(Applicants.length === 0 ){ throw Error('Applications Not Found');}
    else{

        return Applicants;
    }
 }

catch(err)
{

    
    throw err;
}


 };

 exports.GetApplicationByState = async ( Id, State) =>{

    
    try{

        const Applicants = await Db.ApplicationRepository.find({ Job:Id , "Contact.StateOfResidence": State});
   
        if(Applicants.length === 0 ){ throw Error('Applications Not Found');}
        else{
                return Applicants
        }
     }
    
    catch(err)
    {
    
throw Error( err);
    
    }
 };


