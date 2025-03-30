const quiz = require("../models/quizschema");
const resultSchema = require("../models/resultSchema");
const performanceService = require("../services/performanceService");

const quizController = {
    submitQuizResponse: async (req, resp) => {
        try {
            const quizResponse = req.body;
            const { rollNo, name, marks, AssignmentNo } = quizResponse;

            let student = await resultSchema.findOne({ rollNo });
            if (student) {
                const assignmentExists = student.assignments.some(
                    a => a.assignmentNo === AssignmentNo
                );

                if (assignmentExists) {
                    await resultSchema.updateOne(
                        { rollNo, "assignments.assignmentNo": AssignmentNo },
                        {
                            $set: { "assignments.$.marks": marks },
                            $inc: { totalMarks: marks }
                        }
                    );
                } else {
                    await resultSchema.updateOne(
                        { rollNo },
                        {
                            $push: { assignments: { assignmentNo: AssignmentNo, marks } },
                            $inc: { totalMarks: marks }
                        }
                    );
                }
            } else {
                const newStudent = new resultSchema({
                    rollNo,
                    name,
                    totalMarks: marks,
                    assignments: [{ assignmentNo: AssignmentNo, marks }]
                });
                await newStudent.save();
            }

            resp.status(200).json({
                error: "false",
                message: "Response saved successfully"
            });
        } catch (err) {
            resp.status(500).json({
                error: "true",
                message: err.message || "An error occurred while saving the response"
            });
        }
    },

    getQuiz: async (req, res) => {
        const assign_id = req.params.id;
        try {
            const data = await quiz.find({ assignmentId: assign_id }, { "questions": 1, _id: 0 });
            const questions = data.length > 0 ? data[0].questions : [];
            if (data && data.length > 0) {
                res.status(200).json(questions);
            } else {
                res.status(404).send("Document not found");
            }
        } catch (err) {
            res.status(500).json({
                error: "true",
                message: err.message || "An error occurred while fetching the response",
            });
        }
    },

    getPerformance: async (req, res) => {
        try {
            const performanceData = await performanceService.processStudentMarks();
            const stats = performanceService.calculateClassStatistics(performanceData);
            
            res.json({
                error: "false",
                data: {
                    classStatistics: stats,
                    studentPerformance: performanceData
                }
            });
        } catch (err) {
            res.status(500).json({
                error: "true",
                message: "Error fetching student performance data"
            });
        }
    }
};

module.exports = quizController;