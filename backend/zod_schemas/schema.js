const z=require("zod")

const task_validation_schema=z.object({
    title:z.string().min(1,"Title must be at least 1 character").max(50),
    description:z.string()
})
const user_validation_schema=z.object({
    user_name:z.string().min(3,"Name must be at least 3 characters"),
    email:z.string().email("Invalid Email Address"),
    password:z.string().min(6,"Password must be atleast six characters"),
    
})
module.exports={user_validation_schema,task_validation_schema}
