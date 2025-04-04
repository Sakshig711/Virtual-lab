const router=require('express').Router();
const mongoose=require('mongoose');
const authMiddleware=require("../middlewares/auth")
const {Exam,Question,Admin,Student,StudentResult,QuestionAssignment}=require("../models/admin");

// router.get("/get-questions",async(req,res)=>{
//     try{
//         const questions = await Question.find({});
//         res.json(questions);
//     }
//     catch(err){
//         console.error(err);
        
//         res.status(500).json({ success: false, message: "Server error" });

//     }
// })
router.get("/get-questions",async(req,res)=>{
   
       try {
          // Fetch assignments and populate the 'questions' field with actual question documents
          const assignments = await QuestionAssignment.find()
          .populate({
              path: "questions",
              select: "question", // Only include 'question' field and exclude '_id'
          });

      res.json(assignments);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
          res.status(500).json({ success: false, message: "Server error" });
        }
})

router.post("/schedule-exam", async (req, res) => {
    try {
      let { title, selectedQuestions, duration, totalMarks, scheduledTime, createdBy } = req.body;
  
      if (!title || !selectedQuestions.length || !duration || !totalMarks || !scheduledTime || !createdBy) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
      scheduledTime = new Date(scheduledTime).toISOString();

      const admin = await Admin.findById(createdBy);
      if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }

      const newExam = new Exam({
        title,
        selectedQuestions,
        duration,
        totalMarks,
        scheduledTime,
        createdBy
      });
  
      await newExam.save();
  
      res.json({ success: true, message: "Exam scheduled successfully", exam: newExam });
    } catch (error) {
      console.error("Error scheduling exam:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  router.get("/active-exams", async (req, res) => {
    try {
      const currentTime = new Date();
      
   
    const activeExams = await Exam.find({
        scheduledTime: { $lte: currentTime }, // ✅ Exam has started
        $expr: { 
          $gt: [{ $add: ["$scheduledTime", { $multiply: ["$duration", 60000] }] }, currentTime] 
        } // ✅ Exam is still ongoing
      }).populate("selectedQuestions");
  
  
      res.json(activeExams);
    } catch (error) {
      console.error("Error fetching active exams:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });


router.post("/submit-exam", async (req, res) => {
  try {
      console.log("Request received:", req.body);
      let { rollNumber, name, examId, score } = req.body;

      
      const isAssignmentExam = !isNaN(examId) && examId >= 1 && examId <= 20;
      const examType = isAssignmentExam ? "assignment" : "scheduled";

      console.log("Determined Exam Type:", examType);

      let assignment = null;
      if (isAssignmentExam) {
          assignment = await QuestionAssignment.findOne({ assignmentId: examId });
          if (!assignment) {
              return res.status(400).json({ success: false, message: "Invalid assignment reference." });
          }
          examId = assignment._id; 
      } else {
          if (!mongoose.Types.ObjectId.isValid(examId)) {
              return res.status(400).json({ success: false, message: "Invalid scheduled exam reference." });
          }
      }

      let student = await Student.findOne({ rollNumber });
      if (!student) {
          student = new Student({ name, rollNumber, examsTaken: [] });
          await student.save();
      }

     
      const existingAttempt = await StudentResult.findOne({ exam: examId, rollNumber });
      if (existingAttempt) {
          return res.status(400).json({ success: false, message: "You have already attempted this exam." });
      }

     
      const studentResult = new StudentResult({
          student: student._id,
          exam: examId,
          examType,
          rollNumber,
          score,
      });
      await studentResult.save();

     
      student.examsTaken.push(studentResult._id);
      await student.save();

    
      await Exam.findByIdAndUpdate(
          examId,
          { $addToSet: { studentsAttempted: student._id } },
          { new: true }
      );

     
      if (isAssignmentExam && assignment) {
          await QuestionAssignment.findByIdAndUpdate(
              assignment._id,
              { $addToSet: { studentsAttempted: student._id } },
              { new: true }
          );
      }

      res.json({ success: true, message: "Exam submitted successfully!", score });
  } catch (err) {
      console.error("❌ Error submitting exam:", err);
      res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/student-exams/:rollNumber", async (req, res) => {
  try {
      const { rollNumber } = req.params;

      const student = await Student.findOne({ rollNumber });
      if (!student) {
          return res.status(404).json({ success: false, message: "Student not found" });
      }

  
      const studentResults = await StudentResult.find({ rollNumber }).populate("exam");
      console.log("Student Results:", studentResults);

     
      const assignmentExamIds = [];
      const scheduledExamIds = [];

      studentResults.forEach(result => {
          if (result.examType === "assignment") {
              assignmentExamIds.push(result.exam);
          } else {
              scheduledExamIds.push(result.exam);
          }
      });

      
      const scheduledExams = await Exam.find({ _id: { $in: scheduledExamIds } })
          .select("title scheduledTime totalMarks duration createdBy");


      const assignmentExams = await QuestionAssignment.find({ _id: { $in: assignmentExamIds } })
          .populate("questions", "title")
          .populate("createdBy", "name");

      res.json({
          success: true,
          scheduledExams,
          assignmentExams
      });

  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
  }
});

  router.get("/:examId", async (req, res) => {
    try {
      const { examId } = req.params;

   
      if (!mongoose.Types.ObjectId.isValid(examId)) {
          return res.status(400).json({ error: "Invalid Exam ID" });
      }

      
      const exam = await Exam.findById(examId).populate("selectedQuestions");

      if (!exam) {
          return res.status(404).json({ error: "Exam not found" });
      }

      res.json(exam); 
    } catch (error) {
        console.error("Error fetching exam:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;