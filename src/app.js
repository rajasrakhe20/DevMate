const express = require("express");

const app = express();

app.use((req,res)=>{
    res.send("Namaste Node js");
})

app.listen(7777,()=>{
    console.log("Server is running on the port 7777");
})

