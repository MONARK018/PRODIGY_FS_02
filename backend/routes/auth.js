const express = require("express");
const jwt = require('jsonwebtoken');
const User = require("../model/User");


const router = express.Router();
const JWT_SECRET = 'you are welcome';

router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body;
    try{
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if(user)
        {
            return res.status(400).json({message: 'Username or email already exists'});
        }

        user = new User({username, email, password});
        await user.save();
        res.status(201).json({ message: 'User registered' });
    }
    catch(err){
         res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    try{
        let user = await User.findOne({ username});
        if(!user)
        {
            return res.status(400).json({message: 'Invalid Credentials'});
        } 

        let isMatch = await user.matchPassword(password);
        if(!isMatch)
        {
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        const token = jwt.sign({userId: user.User_id}, JWT_SECRET,{expiresIn: '1h' });
        res.json({token});
        
    }
    catch(err){
         res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;