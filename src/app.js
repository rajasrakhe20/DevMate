const express = require("express");
const app = express();

const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());


app.get("/user", async (req,res)=>{

    const userEmail = req.body.emailId;

    try{

        const user = await User.findOne({emailId : userEmail});
        if(!user){
            res.send("User not fount...");
        }
        else{
            res.send(user);
        }
        
    }
    catch(err){
        res.status(400).send("Something went wrong...");
    }
})


//GET Method to fetch all the users
app.get("/feed", async(req,res)=>{
    
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong...");
    }
});

// Detele a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
      const user = await User.findByIdAndDelete({ _id: userId });
      //const user = await User.findByIdAndDelete(userId);
      res.send("User deleted successfully");
    } catch (err) {
      res.status(400).send("Something went wrong ");
    }
  });

app.patch("/user/:userId", async (req,res)=>{

    const userId =  req.params?.userId;
    const data = req.body;

    const emailId =  req.body.emailId;

    try{

        // Update user data through emailId
        // const user = await User.findOneAndUpdate({emailId: emailId},data,{
        //     returnDocument:"after"
        // })

        const ALLOW_UPDATES = ["PhotoUrl","age","gender","skills"];

        const isAllowed = Object.keys(data).every((k)=>{
            ALLOW_UPDATES.includes(k);
        });

        if(!isAllowed){
            throw new Error("Update is not allowed...");
        }
        if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10...");
        }

        // Update user data through userId
        const user = await User.findByIdAndUpdate({_id: userId}, data ,{
            returnDocument: "after",
            runValidators: true
        })

        console.log(user);
        res.send("User is updated successfully...");

    }
    catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message);
    }
})

app.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.send("Login Successful!!!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

app.post("/signup", async (req, res)=>{

    
    try{
        //Validate the data first
        validateSignUpData(req)

        //Creating a new Instance of the model User
        const {firstName , lastName, emailId, password} = req.body;
      
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

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

