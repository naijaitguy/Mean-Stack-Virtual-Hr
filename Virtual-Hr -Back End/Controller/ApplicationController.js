
const ApplcationService = require('../Data Services/Application_Service')
const Validation_Helper = require('../_Helpers/Validation_Helper');
const Joi = require('joi');



exports.GetAllApplication = async (req, res, next) =>{

await ApplcationService.GetAllApplications()
.then( Response => res.status(200).json({Response, Count:Response.length}))
.catch( err => res.status(404).json("Applicaton Not Found"));


next();

};

exports.GetAllApplicationById = async (req, res, next) =>{

    
    const Id = req.params.id;
    await ApplcationService.GetAllApplicationById(Id)
    .then( Response => res.status(200).json(Response))
    .catch( err => res.status(404).json("Applicaton Not Found"));
    
    next();
    
    };

exports.CreateApplication = async (req, res, next) => {


    Joi.validate(req.body, Validation_Helper.ApplicationSchema(req.body), async (err, Result )=>{

        if(err){ res.status(400).json({mgs:err.details.map(i => i.message ).join(" / ")})}
        else{
    
       const User_Id = req.user.Id;
       const Job_Id = req.params.id; 


       const WorkExperienceModel = {
        CompanyName : req.body.CompanyName ,

        StartedDate : req.body.WorkStartedDate,
    
        Position : req.body.Position,
    
        Responsibility : req.body.Responsibility,
    
        EndDate : req.body.WorkEndDate,
       };
       const AcademicModel = {
        InstitutionName : req.body.InstitutionName ,

        StartedDate :req.body.AcademicStartedDate, 
    
        Program : req.body.Program ,
    
        Course : req.body.Course ,
    
       GraduationYear :req.body.GraduationYear ,
    
        ClassOfDegree : req.body.ClassOfDegree
    

       };
       const Model = {
        StateOfResidence : req.body.StateOfResidence,
        Cv :req.body.Cv,
        LGA:req.body.LGA,
        AlternativePhoneNumber :req.body.AlternativePhoneNumber,
        Age : req.body.Age,
        Qualification :req.body.Qualification,
        YearsOfExperience : req.body.YearsOfExperience,
        Gender:req.body.Gender,
        NyscYear  :req.body.NyscYear,
        Email: req.body.Email,
       DateOfBirth : req.body.DateOfBirth,
       Address: req.body.Address,
       FirstName: req.body.FirstName,
       LastName: req.body.LastName,
       PhoneNumber: req.body.PhoneNumber,
       

       };
       await ApplcationService.CreateApplication(Job_Id, User_Id, Model, WorkExperienceModel,AcademicModel).
       then( Response => { res.status(200).json(Response)}).
       catch( err => next(err));}

        });


}    

exports.ManageApplications = async (req,res,next) =>{};

exports.FilterApplicationByAge = async (req,res,next) =>{

    Joi.validate(req.body.Age, Validation_Helper.ValidateInteger(), async (err, Result )=>{

        if(err){ res.status(400).json({mgs:err.details.map(i => i.message ).join(" / ")})}
        else{
    
    
 const Id = req.params.id; 
    await ApplcationService.GetApplicationByAge(Id , req.body.Age)
    .then( collection => res.status(200).json( collection))
    .catch( err => res.status(404).json("Applicant Not Found "));}

        });
};

exports.FilterApplicationByLGA = async (req,res,next) =>{

    Joi.validate(req.body.LGA, Validation_Helper.ValidateString(), async (err, Result )=>{

        if(err){ res.status(400).json({mgs:err.details.map(i => i.message ).join(" / ")})}
        else{
    
    
    const Id = req.params.id; 

    await ApplcationService.GetApplicationByLGA( Id, req.body.LGA)
    .then( collection => res.status(200).json(collection))
    .catch( err => next(err));}

        });

};

exports.FilterApplicationByGender = async (req,res,next) =>{

    Joi.validate(req.body.Gender, Validation_Helper.ValidateString(), async (err, Result )=>{

        if(err){ res.status(400).json({mgs:err.details.map(i => i.message ).join(" / ")})}
        else{
    

       const Id = req.params.id; 
       await  ApplcationService.GetApplicatinByGender(Id, req.body.Gender).
       then( collection => res.status(200).json(collection))
       .catch( err => res.status(404).json("Application Not Found"));}

        });
};

exports.FilterApplicationQualification = async (req,res,next) =>{

    Joi.validate(req.body.State, Validation_Helper.ValidateString(), async (err, Result )=>{

        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
        else{
    

       const Id = req.params.id; 
       await  ApplcationService.GetApplicationByQuailfication(Id, req.body.Qualification).
       then( collection => res.status(200).json({collection, Count:collection.length}))
       .catch( err => res.status(404).json("Application Not Found"));}
 
        });
};

exports.FilterApplicationByYearsOfExperience = async (req,res,next) =>{

    Joi.validate(req.body.Year, Validation_Helper.ValidateInteger(), async (err, Result )=>{

        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
        else{
    

        const Id = req.params.id; 

        await ApplcationService.GetApplicatinByExperience( Id, req.body.Year)
        .then( collection => res.status(200).json({collection, Count:collection.length}))
        .catch( err => next(err));

        }
    });



};


exports.FilterApplicationByState = async (req,res,next) =>{

            /////validate user input with joi-------------
    Joi.validate(req.body.State, Validation_Helper.ValidateString(), async (err, Result )=>{

    if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")})}
    else{

        const Id = req.params.id; 
        await ApplcationService.GetApplicationByState( Id, req.body.State)
        .then( collection => res.status(200).json({collection, Count:collection.length}))
        .catch( err => next(err));

         }            

            });

   

};


exports.GetAllApplicationByJobId = async (req, res, next) =>{

    const Id = req.params.id;
    await ApplcationService.GetAllApplicationByJobId(Id)
    .then( Response => res.status(200).json(Response))
    .catch( err => res.status(404).json("Applicaton Not Found"));
    
    next();
    
    };

 exports.GetAllApplicationByUserId = async (req, res, next) =>{
    const Job_Id = req.params.id;
        const User_Id = req.user.Id;
        await ApplcationService.GetAllApplicationByUserId(User_Id)
        .then( Response => res.status(200).json(Response))
        .catch( err => res.status(404).json("Applicaton Not Found"));
        
        next();
        
        };
        exports.GetApplicationByUserIdAndJobId = async (req, res, next) =>{
            const Job_Id = req.params.id;
                const User_Id = req.user.Id;
                await ApplcationService.GetApplicationByUserIdAndJobId(User_Id,Job_Id)
                .then( Response => res.status(200).json(Response))
                .catch( err => res.status(404).json("Applicaton Not Found"));
                
                next();
                
                };