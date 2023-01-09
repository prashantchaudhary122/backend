const mongoose = require('mongoose')

const connectDB = async () => { 
    try {
        await mongoose.connect("mongodb+srv://iamgroot:groot123@cluster0.n0o6kc6.mongodb.net/project?retryWrites=true&w=majority")
      
        console.log("MongoDB connection SUCCESS!");
    } catch (error) {
        console.error("MongoDB connection FAILED!",error);
        process.exit();
    }
}

module.exports = connectDB;     