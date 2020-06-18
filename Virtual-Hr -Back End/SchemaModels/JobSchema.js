const Express = require("express");
require('dotenv').config();
const Mongoose = require("mongoose");




const  JobSchema = new Mongoose.Schema({

    
CreatorUserId: {type:Mongoose.Schema.Types.ObjectId},

 CompanyName : {  type:String, required:true  },

 JobTitle : {  type:String, required:true  },


 PostedDate : {  type:Date, required:true , default: new  Date().toUTCString() },


 ExpiringDate : {  type:String, required:true  },

 Location : {  type:String, required:true  },

  Discription : {  type:String, required:true  },

 Requirement : {  type:String, required:true  },

JobType : {  type:String, required:true  },

 Qualification: {  type:String, required:true  },

 YearsOfExperience: {  type:Number, required:true  },

 JobField : {  type:String, required:true  },

 Responsibility :{  type:String, required:true  },


});

JobSchema.set('toJSON',{ versionKey:false});
module.exports= Mongoose.model('Job', JobSchema);

