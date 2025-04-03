require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const assignmentController = require("./controllers/assignmentController");
const quizController = require("./controllers/quizController");
const userRoute = require("./routes/userRoute");
const examRoute = require("./routes/examRoute");
const studentRoute = require("./routes/studentRoute"); // Add this line

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: [
            "https://virtual-lab-nine.vercel.app",
            "http://localhost:5173",
            "https://dmsl-virtual-lab.vercel.app",
        ],
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// Routes
app.use("/api", userRoute);
app.use("/api/exams", examRoute);
app.use("/api/students", studentRoute);
app.get("/", (req, resp) => resp.send("hi"));
app.get("/practical/:id", assignmentController.getPractical);
app.get("/assignmentlist", assignmentController.getAssignmentList);
app.post("/quiz-response", quizController.submitQuizResponse);
app.get("/quiz/:id", quizController.getQuiz);
app.get("/students/performance", quizController.getPerformance);

// Start server
app.listen(3000, () => {
    console.log("Listening on 3000");
});
