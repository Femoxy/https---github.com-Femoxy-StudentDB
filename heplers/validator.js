const hapiJoiValidator = require("@hapi/joi");
const validateREgStudent = (data) => {
    const validateStudent = hapiJoiValidator.object({
        name: hapiJoiValidator.string().required().max(20).trim().messages({
            'string.empty': "This field can not be left empty",
        }),
        email: hapiJoiValidator.string().required().max(40),
        password: hapiJoiValidator.string().required().min(6).messages({
            'string.min': 'Password cannot be less than 6 characters'
        })
    });
    return validateStudent.validate(data);
};

const validateLogin = (data) => {
    const validateLogin = hapiJoiValidator.object({
        email: hapiJoiValidator.string().required().trim(),
        password: hapiJoiValidator.string().required().min(6).messages({
            'string.min': 'Password cannot be less than 6 characters'
        }),
    });
    return validateLogin.validate(data);
};

const validateScore = (data) => {
    const validateScore = hapiJoiValidator.object({
        Maths: hapiJoiValidator.number().required(),
        English: hapiJoiValidator.number().required(),
        Geology: hapiJoiValidator.number().required(),
        Biology: hapiJoiValidator.number().required()
          
    });
    return validateScore.validate(data);
};

const validateScoreUpdate = (data) => {
    const scoreUpdate = hapiJoiValidator.object({
        Maths: hapiJoiValidator.number(),
        English: hapiJoiValidator.number(),
        Biology: hapiJoiValidator.number(),
        Geology: hapiJoiValidator.number()
  
          
    });
    return scoreUpdate.validate(data);
};

module.exports = {validateREgStudent, validateLogin, validateScore, validateScoreUpdate};


