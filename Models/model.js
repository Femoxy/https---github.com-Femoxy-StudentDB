const mongoose = require('mongoose');
const Schema = mongoose.Schema
const regSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    })

const regModel = mongoose.model("studentReg", regSchema);

const scoreSchema = new mongoose.Schema(
    {
        Maths: {
            type: Number,
            required: true
        },
        English: {
            type: Number,
            required: true
        },
        Geology: {
            type: Number,
            required: true
        },
        Biology: {
            type: Number,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "regModel",
            required: true
        },
        email: {
            type: Schema.Types.String,
            ref: "regModel",
            required: true
        }

}) 
const scoreModel = mongoose.model("studentScore", scoreSchema)

module.exports = {regModel, scoreModel};