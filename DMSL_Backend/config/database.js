const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const url = "mongodb+srv://dhakekshitij12:DMSLHogaya@assignmentsdata.relxz.mongodb.net/?retryWrites=true&w=majority&appName=AssignmentsData";
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;