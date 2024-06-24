const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();


router.post('/signup',signupValidation,signup)    //this is basically ('/route',validation,controller)
//first validation is done, then the control goes to the controller


router.post('/login',loginValidation,login)

module.exports=router;