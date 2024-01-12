 const express = require('express')
 const router = express.Router();
const {register, logIn, allStudent, enterScore, allScore, updateScore, getOne} = require('../controllers/controller')
const {authenticate}= require('../middleware/authenticate.js');

 router.post("/reg", register);
 router.post("/login", logIn);
 router.get("/all", allStudent);
 router.post("/input", authenticate, enterScore),
 router.put("/changes/:studentId", authenticate, updateScore),
 router.get("/allscore", authenticate, allScore),
 router.get("/oneScore", authenticate, getOne)


 module.exports = router;