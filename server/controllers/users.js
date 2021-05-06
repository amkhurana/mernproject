import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const {email, password}  = req.body;
    try {
        const existuser = await User.findOne({email});
        if (!existuser) return res.status(404).json({message: "user doesn't exit"});
        const iscorrectPass = await bcrypt.compare(password, existuser.password);
        if (!iscorrectPass)  return res.status(404).json({message: "invalid credentials"});
        const token = jwt.sign({email: existuser.email, id: existuser._id}, 'test',{expiresIn:  "1h" });
        console.log('token');
        console.log(token);
        res.status(200).json({res1: existuser, token});
    }catch(err) {
        res.status(500).json({message: 'somthing wrong'});
    }
}

export const signup = async (req, res) => {
    const {email,password, firstName, lastName, confirmPassword} = req.body;
    try {
        const existuser = await User.findOne({email});
        if (existuser) return res.status(404).json({message: "user alrdy exit"});

        if (password !== confirmPassword) return res.status(404).json({message: "password don't match"});

        const hashedpass = await bcrypt.hash(password, 12);

        console.log( `${firstName} ${lastName}`);
        const res1 = await User.create({email, password: hashedpass, name: `${firstName} ${lastName}`});
        const token = jwt.sign({email: res1, id: res1._id}, 'test', {expiresIn:  "1h" });
        res.status(200).json({res1, token});
    }catch(err) {
        res.status(500).json({message: 'somthing wrong'}); 
    }
    
}