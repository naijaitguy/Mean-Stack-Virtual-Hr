const Express = require("express");
require('dotenv').config();
const Mongoose = require("mongoose");





const  ApplicationSchema = new Mongoose.Schema({


    Job: {type:Mongoose.Schema.Types.ObjectId,ref:'Jobs'},
    User: {type:Mongoose.Schema.Types.ObjectId,ref:'Users'},
    
  
  Name:{
      
    FirstName: {  type:String, required:true  } , 
    LastName :{  type:String, required:true  }, 
},


  Contact:  {
      Email: { type:String, required:true  }, 
        Address: {  type:String, required:true  },
        StateOfResidence:{ type:String , default:"Lagos"},
        LGA:{ type:String , default:"Ikorodu"},
         PhoneNumber : {    type:String, required:true  },
          AlternativePhoneNumber: {  type:String, required:true  },
        },
        ApplicationDate:{ type:String , required:true, default:Date() },

 Cv :{  type:String, required:true  },

 Age :{  type:Number, required:true  },

 Qualification: {  type:String, required:true  },

YearsOfExperience :{  type:Number, required:true  },

 Gender: {  type:String, required:true  },

 NyscYear : {  type:String, required:true  },

DateOfBirth: {  type:String, required:true  },

Status : {  ShortListed : { type:Boolean , default:false },

 Interviewed :{ type:Boolean , default:false },

 Tested : { type:Boolean , default:false  }, 

  Hired :  { type:Boolean , default:false} 
 }


});

ApplicationSchema.set('toJSON',{ versionKey:false});

module.exports = Mongoose.model('Application', ApplicationSchema);

