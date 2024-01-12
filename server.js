const express = require('express');
require("./config/dbConfig")
require('dotenv').config()

const port = process.env.port
const app = express();

const studentRouter = require("./routers/router")
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Welcome to your student Portal")
});

app.use("/api/v1", studentRouter)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})