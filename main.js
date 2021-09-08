const express=require("express");
const {DBConnection}=require("./database");
const {json,urlencoded}=express;
const {userRoute}=require("./user/router");
const app=express();
require('dotenv').config()
DBConnection().then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log("db not connected",err);
})

app.use(json());
app.use(urlencoded({extended:true}));
app.use('/user',userRoute);

module.exports={
    app
}









