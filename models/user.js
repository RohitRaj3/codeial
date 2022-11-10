const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //setting up users required input as Schema here
    email:{
        type:     String,
        required: true,           // its acts as neccessory without their inputs mongoose will through error
        unique:   true            // its need to be unique for every users
    },

    password:{
        type: String,             
        required: true
    },

    name:{
        type: String,
        required: true
    }
},{
    //when user visited our website is updated here
    //monggose help us in this
    timestamps: true
})
const User = mongoose.model('User', UserSchema);      //"user" is 
module.exports =  User;