const mongoose = require("mongoose")

const connectMongoDB = async () => {
    try {
    await mongoose.connect("mongodb://localhost:27017/GraphQL")
    console.log("MongoDB connected successfully!")    
    } catch (error) {
        console.log("MongoDB connection failed : ", error.message)
    }
}

module.exports = connectMongoDB;

// Mongodb start command
// sudo systemctl start mongod
