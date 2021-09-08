const{model,Schema}=reuire("mongoose");

const userModel=model("user",Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}))

module.exports={
    userModel
}