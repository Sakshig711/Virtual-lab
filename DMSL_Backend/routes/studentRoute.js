const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student, Exam, QuestionAssignment, StudentResult } = require('../models/admin');

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const student = await Student.findById(decoded.id);
        
        if (!student) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.student = student;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Student Registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, batch, rollNumber, class: studentClass, password } = req.body;

        // Validate input
        if (!name || !email || !batch || !rollNumber || !studentClass || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ 
            $or: [{ rollNumber }, { email }] 
        });
        if (existingStudent) {
            return res.status(400).json({ 
                message: existingStudent.rollNumber === rollNumber 
                    ? "Roll number already registered" 
                    : "Email already registered" 
            });
        }

        // Password strength validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student
        const student = new Student({
            name,
            email,
            batch,
            rollNumber,
            class: studentClass,
            password: hashedPassword
        });

        await student.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering student", error: error.message });
    }
});

// Student Login
router.post('/login', async (req, res) => {
    try {
        const { rollNumber, password } = req.body;
        
        if (!rollNumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find student by roll number
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(401).json({ message: "Invalid roll number or password" });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, student.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid roll number or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id, rollNumber: student.rollNumber },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send success response
        res.json({
            message: "Login successful",
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                batch: student.batch,
                class: student.class,
                rollNumber: student.rollNumber
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Protected route example - Get student profile
// Protected route - Get student profile with exam statistics
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const student = await Student.findById(req.student._id)
            .select('-password')
            .populate({
                path: 'examsTaken',
                populate: [
                    {
                        path: 'exam',
                        select: 'title totalMarks',
                        model: Exam
                    },
                    {
                        path: 'exam',
                        select: 'title assignmentId',
                        model: QuestionAssignment
                    }
                ]
            });

        // Calculate exam statistics
        const examStats = {
            totalExams: student.examsTaken.length,
            scheduledExams: [],
            assignments: [],
            overallScore: 0
        };

        // Process each exam/assignment result
        student.examsTaken.forEach(result => {
            const examData = {
                id: result._id,
                score: result.score,
                attemptedOn: result.attemptedOn,
                examType: result.examType
            };

            if (result.examType === 'scheduled') {
                examStats.scheduledExams.push({
                    ...examData,
                    title: result.exam?.title || 'Unknown Exam',
                    totalMarks: result.exam?.totalMarks || 0,
                    percentage: ((result.score / result.exam?.totalMarks) * 100).toFixed(2)
                });
            } else {
                examStats.assignments.push({
                    ...examData,
                    title: result.exam?.title || 'Unknown Assignment',
                    assignmentId: result.exam?.assignmentId || 'N/A',
                    percentage: ((result.score / 5) * 100).toFixed(2) // Assuming assignment scores are already in percentage
                });
            }
        });

        // Calculate overall performance
        const totalScores = [...examStats.scheduledExams, ...examStats.assignments]
            .map(exam => parseFloat(exam.percentage));
        
        examStats.overallScore = totalScores.length > 0
            ? (totalScores.reduce((a, b) => a + b) / totalScores.length).toFixed(2)
            : 0;

        res.json({
            studentInfo: {
                id: student._id,
                name: student.name,
                email: student.email,
                batch: student.batch,
                class: student.class,
                rollNumber: student.rollNumber
            },
            examStats: {
                ...examStats,
                totalScheduledExams: examStats.scheduledExams.length,
                totalAssignments: examStats.assignments.length
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ 
            message: "Error fetching profile", 
            error: error.message 
        });
    }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // In a real application, you might want to blacklist the token
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error during logout", error: error.message });
    }
});

module.exports = router;