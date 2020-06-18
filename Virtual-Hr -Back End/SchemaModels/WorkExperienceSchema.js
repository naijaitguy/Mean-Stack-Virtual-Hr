const Express = require("express");
require('dotenv').config();
const Mongoose = require("mongoose");





const WorkExperienceSchema = new Mongoose.Schema({

    ApplicationId: {type:Mongoose.Schema.Types.ObjectId,ref:'Application'},

    CompanyName : { type:String , required:true},

    StartedDate : { type:String , required:true },

    Position : { type:String , required:true },

    Responsibility : { type:String , required:true },

    EndDate : { type:String , required:true }

    

});

module.exports = Mongoose.model('WorkExperience', WorkExperienceSchema);