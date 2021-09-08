const jwt=require('jsonwebtoken');
const { UserService } = require("../users/user.service");


 
const Authorization=async(req,res,next)=>{
    try {
        let auth=req.headers.authorization;
        let arr=String(auth).split(" ");
        if(arr.length !=2) {
            throw "token invalid"
        }
        if(arr[0]!=="Barear"){

            throw "token not valid"
        }
        const verify=jwt.verify(arr[1],process.env.APP_SECRET);

        let id=verify.sessionId;
        let dbuser=await userService.getOneUser({_id:id})
        if(!dbuser){
            throw "invalid token"
        }
        req["user"]={
            _id:dbuser._id,
            name:dbuser.name,
            email:dbuser.email,
        };
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:{
                message:error
                
            }
        })
        
    }
}
module.exports={
    Authorization
}