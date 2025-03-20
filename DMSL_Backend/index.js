const express = require("express");
const cors = require("cors");
require("./connect.js");
const doc = require("./docschema.js");
const resultSchema = require("./resultSchema.js");
const quiz=require("./quizschema.js");
const app = express();
const userRoute=require("./routes/userRoute.js");

// Middleware
app.use(express.json()); // Parse incoming JSON requests
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
app.use("/api/",userRoute);
// Routes
app.get("/", (req, resp) => {
    resp.send("hi");
});

app.get("/practical/:id", async (req, resp) => {
    const assign_id = req.params.id;
    try {
        const data = await doc.find({ id: assign_id });

        if (data && data.length > 0) {
            resp.status(200).json(data);
        } else {
            resp.status(404).send("Document not found");
        }
    } catch (error) {
        resp.status(500).send("Server Error");
    }
});

app.get("/assignmentlist", async (req, resp) => {
    try {
        const list = await doc
            .find()
            .select({ id: 1, aim: 1, title: 1, _id: 0 })
            .sort({ id: 1 });
        resp.status(200).json({
            error: "false",
            data: list,
        });
    } catch (err) {
        resp.status(500).json({
            error: "true",
            message: "Internal error",
        });
    }
});

app.post("/quiz-response", async (req, resp) => {
    try {
        const quizResponse = req.body;

        // Save the quiz response using the Mongoose model
        const newResponse = new resultSchema(quizResponse);
        await newResponse.save();

        resp.status(200).json({
            error: "false",
            message: "Response saved successfully",
        });
    } catch (err) {
        resp.status(500).json({
            error: "true",
            message:
                err.message || "An error occurred while saving the response",
        });
    }
});

app.get("/quiz/:id",async(req,res)=>{
    const assign_id = req.params.id;
    try{
        const data = await quiz.find({ assignmentId: assign_id }, { "questions":1, _id: 0 });
        const questions = data.length > 0 ? data[0].questions : [];
        if (data && data.length > 0) {
            res.status(200).json(questions);
        } else {
            res.status(404).send("Document not found");
        }
    }
    catch(err){
        res.status(500).json({
            error: "true",
            message:
                err.message || "An error occurred while fetching the response",
        });
    }
});
// Start server
app.listen(3000, () => {
    console.log("Listening on 3000");
});
