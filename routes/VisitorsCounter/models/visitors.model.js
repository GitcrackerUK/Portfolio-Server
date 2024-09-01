const mongoose = require('mongoose')
const DB = require('../../../DB')
require('dotenv').config();

// const PORTFOLIO_URI = process.env.PORTFOLIO_URI;
// let varName = Object.keys({PORTFOLIO_URI})[0]

// const Schema = mongoose.Schema

// const visitorsSchema = new Schema({
//     counter: {
//         type: Number,
//         required: true
//     }
// }, {
//     timestamps: true
// })

// const visitor = DB(PORTFOLIO_URI, varName).model('Visitor', visitorsSchema);

module.exports = visitor