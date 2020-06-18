const Auth_Helper = require('../_Helpers/Auth_Helper');
const Validation_Helper = require('../_Helpers/Validation_Helper');
const Job_Service = require('../Data Services/Job_service');
const Joi = require('Joi');


exports.GetAllJobs = async (req, res, next) => {

    await Job_Service.GetAllJobs()
    .then( Response => res.status(200).json(Response))
    .catch(err=> next(err) );
};

exports.GetJobById = async (req, res, next) =>{

    const Id = req.params.id;

    await Job_Service.GetJobById(Id)
    .then( Response => res.status(200).json(Response))
    .catch(err => res.status(404).json("User Not Found"));

    next()

};

exports.CreateJob= async (req, res, next)=>{

    Joi.validate(req.body, Validation_Helper.CreateJobSchema(req.body), async (err,result)=>{
        if(err){ res.status(442).json({mgs:err.details.map(i => i.message ).join(" / ")}); return false;}

else{


    const PostedBy = req.user.Id;

    await  Job_Service.CreateJob(PostedBy, req.body)
     .then( Response =>{ res.status(201).json(" Job Created Successfully"); })
     .catch( err => res.status(403).json(" Failed to Create Job Post"));
  next();

}

    });

  
};