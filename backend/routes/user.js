const express=require("express")
require("dotenv").config();
const {User,Task}=require("../models/model")
const jwt=require("jsonwebtoken")
const secret_key=process.env.JWT_SECRET
const {validate_user,check_user_exists_sign_in,check_user_exists_sign_up}=require("../middlewares/validate")
const Router=express.Router()

Router.post('/sign_up',validate_user,check_user_exists_sign_up,async (req,res)=>{
    try{
        const new_user=await User.create({
            user_name:req.body.user_name,
            email:req.body.email,
            password:req.body.password,
        })
        res.status(201).json({
            message:"User created successfully",
            user:new_user
        })
    }catch(err){
        res.status(500).json({
            message:"User not created.Please try again later"
        })
    }
})

Router.get('/sign_in',check_user_exists_sign_in,async (req,res)=>{
    const user_id=(await User.findOne({email:req.body.email}))._id;
    const user=  {
        user_name:req.body.user_name,
        email:req.body.email,
        user_id:user_id
    }
    const token=jwt.sign(user,secret_key)
    res.status(200).json({
        message:"Signed In Successfully",
        token:"Bearer "+token 
    })
})
module.exports=Router