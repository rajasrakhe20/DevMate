const mongoose =  require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require:true,
        maxLength:20,
        minLength:5,
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid..."+ "Check your email: "+ value);
            }
        },
    },
    password:{
        type: String,
        require:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong. Please enter strong password...");
            }
        }
    },
    age:{
        type: Number,
        min:18,
    },
    gender:{
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
              throw new Error("Gender data is not valid");
            }
          },
    },
    photoUrl:{
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Invalid Photo URL: " + value);
            }
          },
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
      },
      skills: {
        type: [String],
      },
},
{
    timestamps:true

}
);

const User = mongoose.model("User", userSchema);

module.exports = User;