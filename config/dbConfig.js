const mongoose = require("mongoose");

const dbHost = 'localhost:27017';
const dbName = 'studentRegDB';

mongoose.connect(`mongodb://${dbHost}/${dbName}`)
.then(()=>{
    console.log("Database connected successfully")
}) .catch((error)=>{
    console.log(error.message)
})
