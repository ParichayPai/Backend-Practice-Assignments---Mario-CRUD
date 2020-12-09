const mongoose = require('mongoose');

//  Your code goes here
const marioModel = new mongoose.Schema({
    name : String,
    weight: Number
})


module.exports = marioModel  //mongoose.model("marioModel", marioModel);