

// const { StudentResult,Student,QuestionAssignment } = require("../models/admin");

// const performanceService = {
//     processStudentMarks: async () => {
//         try {
//             // Fetch all students
//             const students = await Student.find().populate({
//                 path: 'examsTaken', 
//                 match: { examType: 'assignment' }, 
//                 populate: {
//                     path: 'exam',
//                     model: 'QuestionAssignment' 
//                 }
//             });
//             students.forEach(student => {
//                 console.log(`Student Name: ${student.name}`);
//                 console.log(`Roll Number: ${student.rollNumber}`);
                
//                 student.examsTaken.forEach(examResult => {
//                     console.log(`Exam Type: ${examResult.examType}`);
//                     console.log(`Score: ${examResult.score}`);
//                     console.log(`Attempted On: ${examResult.attemptedOn}`);
            
//                     // Access the populated exam details (QuestionAssignment)
//                     const assignment = examResult.exam;
//                     console.log(`Assignment Title: ${assignment.title}`);
//                     console.log(`Assignment ID: ${assignment.assignmentId}`);
//                     console.log(`Number of Questions: ${assignment.questions.length}`);
            
                 
//                 });
//             });
         
//             const results = students.map(student => {
                
//                 const assignments = student.examsTaken;
            
             
//                 const totalMarks = assignments.reduce((sum, studentResult) => sum + studentResult.score, 0);
            
//                 const totalAssignmentsCompleted = assignments.length;
            
//                 const assignmentDetails = assignments.map(studentResult => ({
//                     assignmentId: studentResult.exam.assignmentId, // Correct field for assignment ID
//                     score: studentResult.score
//                 }));
            
              
//                 const maxMarks = totalAssignmentsCompleted * 5 * 5; // Each question is worth 5 marks
            
//                 // Calculate percentage
//                 const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
            
//                 return {
//                     rollNo: student.rollNumber,
//                     name: student.name,
//                     totalMarks: totalMarks,
//                     maxPossibleMarks: maxMarks,
//                     assignmentsCompleted: totalAssignmentsCompleted,
//                     percentage: percentage.toFixed(2),
//                     category: percentage >= 80 ? "Category A" :
//                              percentage >= 50 ? "Category B" : "Category C",
//                     assignments: assignmentDetails // Store assignment details (ID and score)
//                 };
//             });
//             console.log("Processed results: ", JSON.stringify(results, null, 2));

            
//             // Sort by percentage in descending order
//             return results.sort((a, b) => b.percentage - a.percentage);
//         } catch (err) {
//             throw err;
//         }
//     },

//     calculateClassStatistics: (performanceData) => {
//         const totalStudents = performanceData.length;

//         // Calculate category distribution
//         const categoryDistribution = performanceData.reduce((acc, student) => {
//             acc[student.category] = (acc[student.category] || 0) + 1;
//             return acc;
//         }, {});

    
//         const classAverage = totalStudents > 0 ? (
//             performanceData.reduce((sum, student) => sum + parseFloat(student.percentage), 0) / 
//             totalStudents
//         ).toFixed(2) : "0.00";

       
//         const assignmentStats = {};
//         // performanceData.forEach(student => {
//         //     const assignmentId = student.assignmentTitle;
//         //     if (!assignmentStats[assignmentId]) {
//         //         assignmentStats[assignmentId] = {
//         //             totalMarks: 0,
//         //             studentCount: 0,
//         //             average: 0
//         //         };
//         //     }
//         //     assignmentStats[assignmentId].totalMarks += student.totalMarks;
//         //     assignmentStats[assignmentId].studentCount++;
//         // });
//         performanceData.forEach(student => {
//             student.assignments.forEach(assignment => {
//                 const assignmentId = assignment.assignmentId;
//                 if (!assignmentStats[assignmentId]) {
//                     assignmentStats[assignmentId] = {
//                         totalMarks: 0,
//                         studentCount: 0,
//                         average: 0
//                     };
//                 }
//                 assignmentStats[assignmentId].totalMarks += assignment.score;
//                 assignmentStats[assignmentId].studentCount++;
//             });
//         });
        
        
//         Object.keys(assignmentStats).forEach(assignmentId => {
//             const stat = assignmentStats[assignmentId];
//             stat.average = (stat.totalMarks / stat.studentCount).toFixed(2);
//         });

//         return {
//             totalStudents,
//             classAverage,
//             categoryDistribution,
//             assignmentStats
//         };
//     }
// };

// module.exports = performanceService;


const { StudentResult, Student,Exam,QuestionAssignment } = require("../models/admin");

const performanceService = {
   
    processStudentMarks : async () => {
        try {
            const students = await Student.find();
            const studentResults = await StudentResult.find();
    
            const results = await Promise.all(students.map(async (student) => {
                const studentExams = studentResults.filter(result =>
                    result.student.toString() === student._id.toString()
                );
    
                const assignments = studentExams.filter(exam => exam.examType === "assignment");
                const scheduledExams = studentExams.filter(exam => exam.examType === "scheduled");
    
                // Merging assignments and scheduled exams with unique serial numbers
                const examDetails = [
                    ...await Promise.all(scheduledExams.map(async (exam, index) => {
                        const examData = await Exam.findById(exam.exam).select('title totalMarks');
                        return {
                            examType: "Scheduled",
                            assignmentNo: index + 1, // Unique serial number for exams
                            title: examData ? examData.title : "Unknown Exam",
                            totalMarks: examData ? examData.totalMarks : 0,
                            score: examData && examData.totalMarks > 0 
                                ? (exam.score / examData.totalMarks) * 100 
                                : 0
                        };
                    })),
    
                    ...await Promise.all(assignments.map(async (exam, index) => {
                        const examData = await QuestionAssignment.findById(exam.exam).select('title');
                        return {
                            examType: "Assignment",
                            assignmentNo: scheduledExams.length + index + 1, // Unique serial number for assignments
                            title: examData ? examData.title : "Unknown Assignment",
                            totalMarks: 5, // Fixed for assignments
                            score: (exam.score / 5) * 100
                        };
                    }))
                ];
    
                // Calculate total marks and percentages
                const totalMarks = studentExams.reduce((sum, exam) => sum + exam.score, 0);
                const maxPossibleMarks = scheduledExams.reduce((sum, exam) => sum + (exam.totalMarks || 0), 0) + (assignments.length * 5);
                const percentage = maxPossibleMarks > 0 ? ((totalMarks / maxPossibleMarks) * 100).toFixed(2) : "0.00";
    
                return {
                    rollNo: student.rollNumber,
                    name: student.name,
                    totalMarks: totalMarks,
                    maxPossibleMarks: maxPossibleMarks,
                    assignmentsCompleted: assignments.length,
                    scheduledExamsCompleted: scheduledExams.length,
                    percentage: percentage,
                    category: percentage >= 80 ? "Category A" :
                             percentage >= 50 ? "Category B" : "Category C",
                    examDetails: examDetails  // Unified exams and assignments
                };
            }));
    
            console.log("Processed results:", JSON.stringify(results, null, 2));
            return results.sort((a, b) => b.percentage - a.percentage);
        } catch (err) {
            console.error("Error processing student marks:", err);
            throw err;
        }
    },
    
   
    calculateClassStatistics: (performanceData) => {
        const totalStudents = performanceData.length;
    
        // Calculate category distribution
        const categoryDistribution = performanceData.reduce((acc, student) => {
            acc[student.category] = (acc[student.category] || 0) + 1;
            return acc;
        }, {});
    
        // Calculate class average
        const classAverage = totalStudents > 0 ? (
            performanceData.reduce((sum, student) => sum + parseFloat(student.percentage), 0) / totalStudents
        ).toFixed(2) : "0.00";
    
        // Calculate assignment-wise statistics based on title
        const assignmentStats = {};
        performanceData.forEach(student => {
            student.examDetails.forEach(exam => {  // ✅ Fix: Use exam title instead of assignmentNo
                const title = exam.title;  // Use title as key
    
                if (!assignmentStats[title]) {
                    assignmentStats[title] = {
                        totalMarks: 0,
                        studentCount: 0,
                        average: 0
                    };
                }
    
                assignmentStats[title].totalMarks += exam.score;
                assignmentStats[title].studentCount++;
            });
        });
    
        // Calculate average for each assignment/exam
        Object.keys(assignmentStats).forEach(title => {
            const stat = assignmentStats[title];
            stat.average = stat.studentCount > 0 
                ? (stat.totalMarks / stat.studentCount).toFixed(2) 
                : "0.00";
        });
    
        return {
            totalStudents,
            classAverage,
            categoryDistribution,
            assignmentStats
        };
    }
    
};

module.exports = performanceService;