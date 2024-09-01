const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB = require('../../../DB');
require('dotenv').config();

// const TESCO_USERS_URI = process.env.TESCO_USERS_URI;
// let varName = Object.keys({TESCO_USERS_URI})[0]; // It is to pass name of the variable.

// const userSchema = new Schema({
//     user:{
//         type:String,
//         require:true,
//         unique:true,
//         minLength:5,
//         maxLength:12
//     },
//     email:{
//         type:String,
//         require:true,
//         unique:true,
//         minLength:5,
//     },
//     password:{
//         type:String,
//         require:true,
//         minLength:5,
//         maxLength:12
//     },
//     calendar:{
//         type:[]
//     }
// })

// const User = DB(TESCO_USERS_URI,varName).model('User', userSchema);

// module.exports = User