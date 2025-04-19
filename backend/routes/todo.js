const  Router  = require("express").Router()
const { validate_task,validate_token } = require("../middlewares/validate")
const { Task } = require("../models/model")

Router.post('/',validate_token,validate_task,(req,res)=>{
    console.log(req.body)
    const task={
        title:req.body.title,
        description:req.body.description,
        completed:false,
        user_id:req.user.user_id
    }
    Task.create(task).then(()=>{
        res.status(200).json({
            message:"Task Added!!"
        })
    }).catch((err)=>{
        res.status(500).json({
            message:"Please try again,Internal Server error."
        })
    })
})

Router.get('/',validate_token,async (req,res)=>{
    const tasks=await Task.find({user_id:req.user.user_id}).lean();
    // console.log(tasks);
    if(tasks){
        res.status(200).json({
            tasks
        })
    }
    else{
        res.status(200).json({
            message:"No todos Created yet by user."
        })
    }
})

Router.delete('/:id',validate_token,async (req,res)=>{
    const task_id=req.params.id
    console.log(task_id)
    const task_deleted=await Task.findOneAndDelete({_id:task_id,user_id:req.user.user_id})
    if(task_deleted){
        res.json({
            message:"Task deleted from database successfully",
            task_deleted
        })
    }
    else{
        res.json({
            message:"Task not found"
        })
    }
})

Router.put('/:id',validate_token,async (req,res)=>{
    const task_id=req.params.id;
    const new_task={
        title:req.body.title,
        description:req.body.description,
        completed:req.body.completed,
        user_id:req.user.user_id
    }
    try{
        const updated_task=await Task.findOneAndUpdate({_id:task_id,user_id:req.user.user_id},

            new_task,
            {new:true}
        )
        if(updated_task){
            return res.status(200).json({
                message:"Task Update successfully",
                updated_task
            })
        }
        res.status(404).json({
            message:"Todo not found"
        })
    }catch(err){
        res.status(500).json({
            message:"Update failed",
            error:err
        })
    }
})
Router.put('/complete/:id',validate_token,async (req,res)=>{
    try{
        const done_task=await Task.findOneAndUpdate({
            _id:req.params.id,
            user_id:req.user.user_id
        },{
            completed:true
        },{
            new:true
        })
        if(done_task){
            return res.status(200).json({
                message:"Task done",
                completed_task:done_task
            })
        }
    }catch(err){
        res.status(404).json({
            message:"Could not mark task as completed.",
            error:err
        })
    }
})
module.exports=Router