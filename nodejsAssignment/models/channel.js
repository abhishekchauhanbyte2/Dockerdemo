const mongoose = require('mongoose');

const Model = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    }
})

const model2 = mongoose.Schema({
    rollno:{
        type:Number,
        required:true,
        trim:true
    },
    name : {
        type : String, 
        required :true,
        trim : true
    } ,
    dob :{
        type : String,
        required :true,
        trim :true
    } ,
    score :{
        type: Number,
        required : true,
        trim :true
    }

})
const dbModel = mongoose.model("dbModel" , Model)
const dbResult = mongoose.model("dbResult" , model2)
module.exports = {dbModel , dbResult}