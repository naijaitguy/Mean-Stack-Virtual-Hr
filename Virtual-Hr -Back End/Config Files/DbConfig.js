const Mongoose = require("mongoose");
Mongoose.connect(process.env.DATABASEPATH, { useNewUrlParser:true, useCreateIndex:true ,useUnifiedTopology:true})
.then( con=>{console.error(" Connection Successful  ");})
.catch( err=>{console.error(" Failed To Connect to Db " + err);}); 
Mongoose.Promise = global.Promise;  

exports.UserRepository = require('../SchemaModels/UserSchema');

exports.JobRepository = require('../SchemaModels/JobSchema');

exports.ApplicationRepository = require('../SchemaModels/ApplicationsSchema');

exports.AcademicRepository = require('../SchemaModels/InstitutionSchema');

exports.WorkExRepository = require('../SchemaModels/WorkExperienceSchema');

