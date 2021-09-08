const {userModel}=require("./model");
const bcrypt=require('bcrypt');

const userService={
    async createUser(){
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(user.password,salt);
        let newUser=new UserModel();
        newUser.name=user.name;
        newUser.email=user.email;
        newUser.password=hash;
        newUser.save();
        return "user saved";

    },
    async getAllUser(){
        return userModel.find({})
    },
    async getOneUser(condition){
        return userModel.findOne(condition)
    },
    async updateOne(condition,newValue){
        return userModel.updateUser(condition,{$set:newValue,})
    }

};
module.exports={
    userService
}