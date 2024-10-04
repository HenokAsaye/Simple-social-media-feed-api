import {check , validationResult}  from "express-validator";

export const validateLogin = [
    check('username')
        .notEmpty().withMessage("username is required!")
        .isLength({min:3}).withMessage('username must be atleast 3 charachter long'),
    check('password')
        .notEmpty().withMessage('password is required!')
        .isLength({min:3,max:15}).withMessage('password must be atleast 3 charachter long and atmost 15 word long'),
    check('email')
        .isEmail().withMessage('please enter valid email')
        .notEmpty().withMessage('email is required to cerate account!'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(errors){
            return res.status(400).json({errors:errors.array()})
        }
        next();
    }
];


