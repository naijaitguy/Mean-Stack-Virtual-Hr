const Express = require("express");
require('dotenv').config();
const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({

    UserName:{ type:String,required:true, unique:true},
    Email:{ type:String,required:true, unique:true},
    Password:{ type:String,required:true},
    RefreshToken: {type:String},
    Role:{ type: String},
    PhoneNumber:{ type:String,required:true},
    Address:{ type:String,required:true},
    FirstName :{ type:String, required:true } ,
    LastName:{ type:String, required:true},
    DateCreated:{ type:String, required:true, default: Date()},
    UpdatedDate:{type:String},
    LastLogin: { type:String}

});

UserSchema.set('toJSON',{ versionKey:false});

module.exports = Mongoose.model("User", UserSchema);