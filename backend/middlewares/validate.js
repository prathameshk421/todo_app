const {User}=require('../models/model')
const jwt=require('jsonwebtoken')
require("dotenv").config()
const secret_key=process.env.JWT_SECRET;
function validate_token(req,res,next){
    const token=req.headers.authorization.split(' ')[1]
    console.log(token)
    if(token==undefined){
        return res.status(401).json({
            message:"No Token Provided"
        })
    }
    try{
        const decoded_user=jwt.verify(token,secret_key);
        console.log("Token Verification Successful")
        console.log(decoded_user)
        req.user={
            user_id:decoded_user.user_id,
            email:decoded_user.email,
            user_name:decoded_user.user_name
        }
        next()
    }catch(err){
        console.log(err);
        res.status(401).json({
            message:"Invalid Token"
        })
    }
    
}
async function validate_user(req,res,next){
    const result=user_validation_schema.safeParse(req.body)
    if(!result.success){
        console.log("Invalid user")
        return res.status(400).json({
            message:"Invalid User Details"
        })
    }
    next()
}
async function check_user_exists_sign_up(req,res,next){
    const found=await User.findOne({"email":req.body.email});
    if(found){
        return res.status(400).json({
            message:"User with email address already exists."
        })
    }
    next()
}
async function check_user_exists_sign_in(req,res,next){
    const found=await User.findOne({
        user_name:req.body.user_name,       
        email:req.body.email
    });
    if(!found){
        return res.status(400).json({
            message:"User does not exist."
        })
    }
    next()
}
function validate_task(req,res,next){
    const task={
        title:req.body.title,
        description:req.body.description,
    }
    const result=task_validation_schema.safeParse(task)
    if(!result.success){
        res.status(400).json({
            message:"Invalid Task Details"
        })
    }
    next()
}

module.exports={validate_user,validate_task,check_user_exists_sign_in,check_user_exists_sign_up,validate_token}