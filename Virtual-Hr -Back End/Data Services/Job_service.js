
const Db = require('../Config Files/DbConfig');



exports.GetAllJobs = async () =>{

  return  await Db.JobRepository.find().sort({PostedDate:1});
};

exports.GetJobById = async (Id) =>{ 

if(Id == null){ throw Error("Id Can Not Be Empty");}else{

const Job =  await Db.JobRepository.findById(Id);

if(Job !== null){ return Job;}else{ throw Error( "No Job  Found");}

}

 };

 exports.CreateJob = async (Id,Model) => {

  try{

    const PostedBy = await Db.UserRepository.findById(Id);
    if(PostedBy ==null ){ throw Error('Unauthorize User');}
    else{
            
       
        const Job = new Db.JobRepository(Model);
        Job.CreatorUserId = PostedBy._id;
        await Job.save();
        return("JOb Created");

    }


  }
  catch(err)
{   console.log(err); throw Error(err);  }
 };