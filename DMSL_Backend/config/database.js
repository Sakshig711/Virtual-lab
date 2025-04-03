const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        const url = process.env.DATABASE_URL;
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;