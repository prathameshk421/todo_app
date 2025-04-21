const {user_data_base}=require("../config/connect_to_database")

const tasks_schema=new user_data_base.Schema({
    title:String,
    description:String,
    completed:{
        type:Boolean,
        default:false
    },
    user_id:{
        type:user_data_base.Schema.Types.ObjectId,
        ref:"User"
    }
})

const user_schema=new user_data_base.Schema({
    user_name:String,
    email:String,
    password:String,
})

const Task=user_data_base.model("Task",tasks_schema)
const User=user_data_base.model("User",user_schema)

module.exports={User,Task}