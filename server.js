const {app}=require("./main");
const PORT=8080;

app.listen(PORT,()=>{
    console.log("app started on port"+PORT);
})