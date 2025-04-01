const router=require('express').Router();
const User=require("../models/login");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
// const Quiz=require("../quizschema");
const {Question}=require("../models/admin");
const {QuestionAssignment,StudentResult}= require("../models/admin");
const {Admin}=require("../models/admin");
const authMiddleware=require("../middlewares/auth");
const performanceService = require('../services/performanceService');

router.post("/login", async (req, res) => {
  
    try {
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, message: "Admin not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT with name and email
        const token = jwt.sign(
            { userId: admin._id, name: admin.name, email: admin.email },
        "dmsl",
            { expiresIn: "1d" }
        );

        res.json({ success: true, message: "Login successful", data: token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


router.post("/register", async (req, res) => {
    try {
        console.log("Request received:", req.body.email);

        // ✅ Check if user already exists
        const user = await Admin.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

     const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

      
        const newUser = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            data: err,
            success: false,
        });
    }
});

router.get("/get-all-quiz", async (req, res) => {
    try {
      // Fetch assignments and populate the 'questions' field with actual question documents
      const assignments = await QuestionAssignment.find().populate("questions"); 
  
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
router.put("/update-question/:questionId",async (req, res) => {
    try {
        const { questionId } = req.params;
        const { question, options, correctOption } = req.body;

        console.log("Received PUT request to update question:");
        console.log("Question ID:", questionId);
        console.log("Request Body:", req.body);

        const result = await Question.findByIdAndUpdate(
            questionId,
            { question, options, correctOption },
            { new: true }
        );

        if (!result) {
            console.log("Question not found in database");
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        console.log("✅ Question updated successfully:", result);
        res.json({ success: true, message: "Question updated", data: result });
    } catch (error) {
        console.error("❌ Error updating question:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/add-question-to-exam", async (req, res) => {
    try {
      const { assignmentId, question, options, correctOption } = req.body;
  
      
      const assignment = await QuestionAssignment.findById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ success: false, message: "Assignment not found" });
      }
  
     
      const newQuestion = new Question({
        question,
        options,
        correctOption,
        assignmentId: assignment._id,
      });
  
      await newQuestion.save(); 
  
      res.json({ success: true, message: "Question added successfully!", questionId: newQuestion._id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  router.get('/class-statistics', async (req, res) => {
    try {
        const studentPerformance = await performanceService.processStudentMarks();
        const stats = performanceService.calculateClassStatistics(studentPerformance);

        
        const quizzes = Object.entries(stats.assignmentStats).map(([assignmentId, data], index) => ({
            id: index + 1, 
            title: `Assignment ${assignmentId}`,
            totalStudents: stats.totalStudents,
            appearedStudents: data.studentCount,
            averageMarks: parseFloat(data.average),
            marksDistribution: [
                { category: '0-30', count: studentPerformance.filter(s => s.percentage < 30).length },
                { category: '31-60', count: studentPerformance.filter(s => s.percentage >= 30 && s.percentage < 60).length },
                { category: '61-80', count: studentPerformance.filter(s => s.percentage >= 60 && s.percentage < 80).length },
                { category: '81-100', count: studentPerformance.filter(s => s.percentage >= 80).length }
            ]
        }));

        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/student-performance', async (req, res) => {
    try {
        const studentPerformance = await performanceService.processStudentMarks();
        
       
        const students = studentPerformance.map((student, index) => ({
            key: (index + 1).toString(),
            name: student.name,
            rollNo: student.rollNo,
            totalAssignments: student.assignmentsCompleted,
            marks: student.totalMarks,
            category: student.category,
            assignments: student.assignments.map(assignment => ({
                name: `Assignment ${assignment.assignmentId}`,
                marks: assignment.score,
                date: "2024-01-10" // Placeholder, replace with actual assignment date if available
            }))
        }));

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/recent-submissions', async (req, res) => {
    try {
      
        const recentSubmissions = await StudentResult.find({ examType: 'assignment' })
            .populate({
                path: 'student', 
                select: 'name'   
            })
            .populate({
                path: 'exam', 
                model: 'QuestionAssignment',
                select: 'title' 
            })
            .sort({ attemptedOn: -1 }) 
            .limit(10); 

      
        const formattedSubmissions = recentSubmissions.map(submission => {
            console.log(submission.student);  // Log student data to debug
            return {
                student: submission.student ? submission.student.name : 'Unknown',
                quiz: submission.exam.title,
                score: submission.score,
                date: submission.attemptedOn.toISOString().split('T')[0],
                status: submission.score >= 50 ? 'Completed' : 'Failed'
            };
        });
        
        res.json(formattedSubmissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get("/assignment-count", async (req, res) => {
    try {
      
        const assignments = await QuestionAssignment.find().select("assignmentId studentsAttempted");
  
        if (!assignments.length) {
            return res.status(404).json({ success: false, message: "No assignments found." });
        }
  
    
        const attemptsData = assignments.map(assignment => ({
            assignmentId: assignment.assignmentId,
            attemptCount: assignment.studentsAttempted.length
        }));
  
        res.json({ success: true, assignments: attemptsData });
    } catch (err) {
        console.error("❌ Error fetching assignment attempts:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
module.exports = router;