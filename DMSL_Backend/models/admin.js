const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [String],
    correctOption: String,
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionAssignment", default: null }, // Null if custom question
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" } // Tracks who created it
});


const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    assignmentId: { type: Number, default: 1 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
       studentsAttempted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});


const examSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Exam Name
    selectedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Selected from pool or created
    duration: { type: Number, required: true }, // Duration in minutes
    totalMarks: { type: Number, required: true },
    scheduledTime: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Teacher/Admin who created it
    studentsAttempted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

const studentResultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // Links to Student
    exam: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can store either Exam or QuestionAssignment ID
    examType: { type: String, enum: ["scheduled", "assignment"], required: true }, // Differentiates between types
    rollNumber: { type: String, required: true }, 
    score: { type: Number, required: true },
    attemptedOn: { type: Date, default: Date.now }
});


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true }, // ✅ Roll number as unique identifier
    examsTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentResult" }] // Track attempted exams
});

// Admin (Teachers) Schema
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Question = mongoose.model("Question", questionSchema);
const QuestionAssignment = mongoose.model("QuestionAssignment", assignmentSchema);
const Exam = mongoose.model("Exam", examSchema);
const StudentResult = mongoose.model("StudentResult", studentResultSchema);
const Student = mongoose.model("Student", studentSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Question, QuestionAssignment, Exam, StudentResult, Student, Admin };
