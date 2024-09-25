import {check , validationResult}  from "express-validator";

export const validateLogin = [
    check('username')
        .notEmpty().withmessage("username is required!")
        .isLength({min:3}).withmessage('username must be atleast 3 charachter long'),
    check('password')
        .notEmpty().withmessage('password is required!')
        .isLength({min:3,max:15}).withmesssage('password must be atleast 3 charachter long and atmost 15 word long'),
    check('email')
        .isEmail().withmessage('please enter valid email')
        .notEmpty().withmessage('email is required to cerate account!'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(errors){
            return res.status(400).json({errors:errors.array()})
        }
        next();
    }
];


