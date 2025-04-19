const user_data_base=require("mongoose")
require("dotenv").config()
const connectDB=()=>{
    user_data_base.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to Database")
    }).catch((err)=>{
        console.log("Error Connecting to database")
        console.log("Error:",err)
    })
}

module.exports={user_data_base,connectDB}