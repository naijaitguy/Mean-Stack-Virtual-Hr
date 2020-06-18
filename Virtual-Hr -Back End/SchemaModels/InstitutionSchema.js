const Express = require("express");
require('dotenv').config();
const Mongoose = require("mongoose");



const AcademicSchema = new Mongoose.Schema({
  ApplicationId: {type:Mongoose.Schema.Types.ObjectId,ref:'Application'},
    InstitutionName : { type:String, required:true },

    StartedDate : { type:String, required:true },

    Program : { type:String, required:true },

    Course : { type:String, required:true },

   GraduationYear : { type:String, required:true },

     ClassOfDegree : { type:String, required:true },


});

module.exports = Mongoose.model('AcademicHistory', AcademicSchema);