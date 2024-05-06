const User = require("../models/user-model");
const Book = require("../models/users-other")
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const home =async(req,res) =>{
    try{
        res.status(200).json({message:"WELCOME ROUTER"});
    }catch(err){
        console.log(error);
    }
};

const register = async(req,res,next)=>{
try{
    console.log(req.body);
    const {username,password,email,phone}= req.body;

    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({msg:"User already exists"});
    }
    const userCreated= await User.create({username,password,email,phone});
    
    res.status(201).json({msg :"registration successful", 
    token: await userCreated.generateToken(),
    userId:userCreated._id.toString(),
});
}catch(error){
    //res.status(500).send("internal server error");
    next(error);
}
}

const login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const userExist =  await User.findOne({email});
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({message: "Invalid credentials"});

        }
        const user= await userExist.comparePassword(password);

        if(user){
            res.status(200).json({msg :"login successful", 
            token: await userCreated.generateToken(),
            userId:userCreated._id.toString(),
            });
        }else{
            res.status(401).json({message: "Invalid email or password "})
        }

    }catch(error){
        res.status(500).json("internal server error");
    }
}
const book = async(req,res,next)=>{
    try{
        console.log(req.body);
        const {username,phone,clientId,ride}= req.body;
        //if(ride === false){
         //   return res.status(400).json({msg:"Ride is not booked"});
        //}
        const rideCreated= await Book.create({username,phone,clientId,ride});
        
        res.status(201).json({msg :"booked successfully", 
        userId:userCreated._id.toString(),
    });
    }catch(error){
        //res.status(500).send("internal server error");
        next(error);
    }
    }

module.exports = {home,register,login,book}