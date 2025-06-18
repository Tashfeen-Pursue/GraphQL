const mongoose = require("mongoose")

const connectMongoDB = async () => {
    try {
    await mongoose.connect("mongodb://localhost:27017")
    console.log("MongoDB connected successfully!")    
    } catch (error) {
        console.log("MongoDB connection failed : ", error.message)
    }
}

module.exports = connectMongoDB;