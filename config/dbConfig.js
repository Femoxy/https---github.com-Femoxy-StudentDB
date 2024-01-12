const mongoose = require("mongoose");
require('dotenv').config();

const DB = process.env.database

mongoose.connect(DB)
.then(()=>{
    console.log("Database connected successfully")
}) .catch((error)=>{
    console.log("ERROR"+error.message)
})
