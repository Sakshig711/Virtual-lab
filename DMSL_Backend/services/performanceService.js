// const resultSchema = require("../models/resultSchema.js");

// const performanceService = {
//     processStudentMarks: async () => {
//         try {
//             const students = await resultSchema.find({});
            
//             const results = students.map(student => {
//                 const totalAssignments = student.assignments.length;
//                 const totalMarks = student.totalMarks;
//                 const maxMarks = totalAssignments * 5; // Assuming each assignment has max 5 marks
//                 const percentage = (totalMarks / maxMarks) * 100;

//                 return {
//                     rollNo: student.rollno,
//                     name: student.name,
//                     totalMarks: totalMarks,
//                     maxPossibleMarks: maxMarks,
//                     assignmentsCompleted: totalAssignments,
//                     assignments: student.assignments,
//                     percentage: percentage.toFixed(2),
//                     category: percentage >= 80 ? "Category A" : 
//                              percentage >= 50 ? "Category B" : "Category C"
//                 };
//             });

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

//         // Calculate class average
//         const classAverage = totalStudents > 0 ? (
//             performanceData.reduce((sum, student) => sum + parseFloat(student.percentage), 0) / 
//             totalStudents
//         ).toFixed(2) : "0.00";

//         // Calculate assignment-wise statistics
//         const assignmentStats = {};
//         performanceData.forEach(student => {
//             student.assignments.forEach(assignment => {
//                 if (!assignmentStats[assignment.assignmentNo]) {
//                     assignmentStats[assignment.assignmentNo] = {
//                         totalMarks: 0,
//                         studentCount: 0,
//                         average: 0
//                     };
//                 }
//                 assignmentStats[assignment.assignmentNo].totalMarks += assignment.marks;
//                 assignmentStats[assignment.assignmentNo].studentCount++;
//             });
//         });

//         // Calculate average for each assignment
//         Object.keys(assignmentStats).forEach(assignmentNo => {
//             const stat = assignmentStats[assignmentNo];
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


const { StudentResult,Student,QuestionAssignment } = require("../models/admin");

const performanceService = {
    processStudentMarks: async () => {
        try {
            // Fetch all students
            const students = await Student.find().populate({
                path: 'examsTaken', 
                match: { examType: 'assignment' }, 
                populate: {
                    path: 'exam',
                    model: 'QuestionAssignment' 
                }
            });
            students.forEach(student => {
                console.log(`Student Name: ${student.name}`);
                console.log(`Roll Number: ${student.rollNumber}`);
                
                student.examsTaken.forEach(examResult => {
                    console.log(`Exam Type: ${examResult.examType}`);
                    console.log(`Score: ${examResult.score}`);
                    console.log(`Attempted On: ${examResult.attemptedOn}`);
            
                    // Access the populated exam details (QuestionAssignment)
                    const assignment = examResult.exam;
                    console.log(`Assignment Title: ${assignment.title}`);
                    console.log(`Assignment ID: ${assignment.assignmentId}`);
                    console.log(`Number of Questions: ${assignment.questions.length}`);
            
                 
                });
            });
         
            const results = students.map(student => {
                
                const assignments = student.examsTaken;
            
             
                const totalMarks = assignments.reduce((sum, studentResult) => sum + studentResult.score, 0);
            
                const totalAssignmentsCompleted = assignments.length;
            
                const assignmentDetails = assignments.map(studentResult => ({
                    assignmentId: studentResult.exam.assignmentId, // Correct field for assignment ID
                    score: studentResult.score
                }));
            
              
                const maxMarks = totalAssignmentsCompleted * 5 * 5; // Each question is worth 5 marks
            
                // Calculate percentage
                const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
            
                return {
                    rollNo: student.rollNumber,
                    name: student.name,
                    totalMarks: totalMarks,
                    maxPossibleMarks: maxMarks,
                    assignmentsCompleted: totalAssignmentsCompleted,
                    percentage: percentage.toFixed(2),
                    category: percentage >= 80 ? "Category A" :
                             percentage >= 50 ? "Category B" : "Category C",
                    assignments: assignmentDetails // Store assignment details (ID and score)
                };
            });
            console.log("Processed results: ", JSON.stringify(results, null, 2));

            
            // Sort by percentage in descending order
            return results.sort((a, b) => b.percentage - a.percentage);
        } catch (err) {
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

    
        const classAverage = totalStudents > 0 ? (
            performanceData.reduce((sum, student) => sum + parseFloat(student.percentage), 0) / 
            totalStudents
        ).toFixed(2) : "0.00";

       
        const assignmentStats = {};
        // performanceData.forEach(student => {
        //     const assignmentId = student.assignmentTitle;
        //     if (!assignmentStats[assignmentId]) {
        //         assignmentStats[assignmentId] = {
        //             totalMarks: 0,
        //             studentCount: 0,
        //             average: 0
        //         };
        //     }
        //     assignmentStats[assignmentId].totalMarks += student.totalMarks;
        //     assignmentStats[assignmentId].studentCount++;
        // });
        performanceData.forEach(student => {
            student.assignments.forEach(assignment => {
                const assignmentId = assignment.assignmentId;
                if (!assignmentStats[assignmentId]) {
                    assignmentStats[assignmentId] = {
                        totalMarks: 0,
                        studentCount: 0,
                        average: 0
                    };
                }
                assignmentStats[assignmentId].totalMarks += assignment.score;
                assignmentStats[assignmentId].studentCount++;
            });
        });
        
        
        Object.keys(assignmentStats).forEach(assignmentId => {
            const stat = assignmentStats[assignmentId];
            stat.average = (stat.totalMarks / stat.studentCount).toFixed(2);
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
