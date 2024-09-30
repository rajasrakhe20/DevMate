const mongoose = require ("mongoose");

const connectDB = async ()=>{

    await mongoose.connect("mongodb+srv://admin:M2qZW5cJ4n6sJOir@namastedev.l2mud.mongodb.net/DevMate");
};

module.exports = connectDB;

