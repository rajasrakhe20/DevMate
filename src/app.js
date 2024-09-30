const express = require("express");
const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");


app.post("/signup", async (req, res)=>{

    //Instance of the model User

    const user = new User({
        firstName:"Shivam",
        lastName:"Rakhe",
        emailId:"rakhe@gmail.com",
        password:"vit123",
        age:25,
        gender:"M"
    });

    try{
        await user.save();
        res.send("User is added successfully...");
    }
    catch(err){
        res.status(400).send("Error in saving the User:"+err.message);
    }

    
})

connectDB().then(()=>{
    console.log("Database connection is done successfully...");

    app.listen(7777,()=>{
        console.log("Server is running on port 7777...");
    })
}).catch((err)=>{
    console.log("Database connection is not donne successfully...");
});


// app.use("/admin",(req,res)=>{
//     res.send("Welcome admin");
// })

// app.use((req,res)=>{
//     res.send("Namaste Node js");
// })

// app.listen(7777,()=>{
//     console.log("Server is running on the port 7777");
// })

