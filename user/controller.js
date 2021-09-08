const{userService}=require("./service");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const userController={
    async register(req,res,next){
     try {
         const body=req.body;
         const dbuser=await userService.getOneUser({
            name:body.name
        })
        if(dbuser){
            throw new Error("user with same name already exists")
        }
        const dbUserEmail=await userService.getOneUser({
            email:body.email
        })
        if(dbUserEmail){
            throw new Error("user with same email already exists")
        }
        const response=userService.createUser(body)
        res.status(201).json({
            data:response
        });
        return
     } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error
        })
     }
    
    },
    async login(req,res,next){
        /**
         * login the users which is in database
         */
        try {
            let body=req.body;
            let dbuser=await userService.getOneUser({email:body.email});
            if(!dbuser){
                throw "user not found";
            }
            const comparePassword=await bcrypt.compare(body.password,dbuser.password);
            if(!comparePassword){
                throw "invalid credentials";
            }

            const token=jwt.sign({sessionId:dbuser._id},process.env.APP_SECRET,{expiresIn:'12h'});
            res.status(200).json({
                token:token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
               
               error:{ message:error}
            })
            
        }
        

    },
    async getAll(req,res,next){
        /**
         * get all users which is in database
         */
        try {
            console.log("get all user controller",req.user);
            const data=await userService.getAllUser();
            res.status(200).json({
                users:data
            })
        } catch (error) {
            res.status(500).json({
                error:{
                    message:error
                }
            })
            
        }
    },
    getMyData(req,res,next){
       /**
        * this is to get only my data
        */
            let id=req.user._id;
            userService.getOneUser({
                _id:id
            }).then(data=>{
                res.status(200).json({
                    data
                })
            }).catch(error=>{
                res.status(500).json({
                    error:{
                        message:error
                    }
                })
            })
        
    }

}
module.exports={

    userController
}

    