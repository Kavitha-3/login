const {Router} =require ("express");
const {Authorization}=require("../middleware/Authorization");
const {userController}=require("./controller");

const userRoute=Router();

userRoute.get('/',Authorization,userController.getAll);
userRoute.get('/me',Authorization,userController.getMyData);
userRoute.post('/register',userController.register);
userRoute.post('/login',userController.login);

module.exports={
   userRoute
}