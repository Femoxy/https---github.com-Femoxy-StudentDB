const {regModel, scoreModel} = require('../Models/model');
const bcrypt = require("bcrypt");
const {validateREgStudent, validateLogin, validateScore, validateScoreUpdate} = require("../heplers/validator")
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const {error} = await validateREgStudent(req.body);
        if(error){
            res.status(500).json({
                message: error.details[0].message,
            })
        } else {const { name, email, password} = req.body;
        const checkEmail = await regModel.findOne({email})
        if (checkEmail) {
            res.status(400).json({
                message: "email already exist"
            }); return
        }

        // We salt our password for us to be able to encrypt it
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create the user data
        const student = await new regModel({
            name: name,
            email: email.toLowerCase(),
            password: hashedPassword,
        })

        await student.save();
        res.status(201).json({
            message: 'User created successfully',
            data: student
        })
}
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

const logIn = async (req, res) => {
    try {
        const {error} = await validateLogin(req.body);
        if(error) {
            res.status(500).json({
                message: error.details[0].message,
            })
        } else {
            const {email, password} = req.body;

        const studentExist = await regModel.findOne({email: email.toLowerCase()})
        if(!studentExist){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const checkPassword = bcrypt.compareSync(password, studentExist.password);
        // const passwordExist = await regModel.findone({password})
        if(!checkPassword){
            return res.status(404).json({
                message: "Incorrect password"
            })
        }
        const token = jwt.sign({
            userId: studentExist._id,
            email: studentExist.email
        }, process.env.SECRET, {expiresIn: "1d"})

        res.status(200).json({
            message: "Login successful",
            token: token
        })

        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }   
}

const enterScore = async (req, res) => {
    try {
        const {error} = await validateScore(req.body);
        if (error){
            res.status(500).json({
                message: error.details[0].message
            })
        } else {
            const userId = req.user.userId;
        const email = req.user.email
        const {Maths, English, Geology, Biology} = req.body;
        if(Maths == "" || English == "" || Geology == "" || Biology == ""){
            res.status(400).json({
                message: "Any of the subject can't be left empty"
            }); return
        }
        const score = await scoreModel({
            Maths, English, Geology, Biology, userId: userId, email: email
        })
        if (!score) {
            res.status(404).json({
                message: 'Score not found'
            }); return
        } 
        await score.save();
            res.status(201).json({
                message: 'Score entered successfully',
                data: score
            });

        }  
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
};
// Get all Student Score
const allScore = async (req, res) => {
    try {
        const userId = req.user.userId;
        const email = req.user.email;

        const scores = await scoreModel.find();
        if(!scores) {
            res.status(404).json({
                message: "Scores not Found"
            }); return
        } else {
            res.status(200).json({
                message: "Scores Available",
                data: scores
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

// Get a student Score
const getOne = async (req, res) => {
    try {
        const userId = req.user.userId;
        const email = req.user.email;

        const scores = await scoreModel.findOne({userId});
        if(!scores) {
            res.status(404).json({
                message: "Scores not Found"
            }); return
        } else {
            res.status(200).json({
                message: "Scores Available",
                data: scores
            })
        }
        
    } catch (error) {
         res.status(500).json({
            message: error.message
         })
    }
}

//update a student score
const updateScore = async (req, res) => {
    try { 
        const {error} = await validateScoreUpdate(req.body);
        if (error){
            res.status(500).json({
                message: error.details[0].message
            }); return
        } else {
            const userId = req.user.userId;

            const {Maths, English, Geology, Biology} = req.body;

             const student = await scoreModel.findOne({userId: userId});
             if(!student){
                return res.status(404).json({
                    message: 'score not found'
                });
            }
             const studentdata = {
                Maths: Maths || student.Maths,
                English: English || student.English,
                Geology: Geology || student.Geology,
                Biology: Biology || student.Biology
             }
             console.log(studentdata)
             const scoreData = await scoreModel.findOneAndUpdate({userId}, studentdata, {new: true});
             res.status(201).json({
                message: "Score updated successfully",
                data: scoreData
             })

        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}
module.exports = {register, logIn, enterScore, allScore, getOne, updateScore}