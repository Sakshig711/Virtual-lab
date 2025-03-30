const resultSchema = require("../models/resultSchema.js");

const performanceService = {
    processStudentMarks: async () => {
        try {
            const students = await resultSchema.find({});
            
            const results = students.map(student => {
                const totalAssignments = student.assignments.length;
                const totalMarks = student.totalMarks;
                const maxMarks = totalAssignments * 5; // Assuming each assignment has max 5 marks
                const percentage = (totalMarks / maxMarks) * 100;

                return {
                    rollNo: student.rollno,
                    name: student.name,
                    totalMarks: totalMarks,
                    maxPossibleMarks: maxMarks,
                    assignmentsCompleted: totalAssignments,
                    assignments: student.assignments,
                    percentage: percentage.toFixed(2),
                    category: percentage >= 80 ? "Category A" : 
                             percentage >= 50 ? "Category B" : "Category C"
                };
            });

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

        // Calculate class average
        const classAverage = totalStudents > 0 ? (
            performanceData.reduce((sum, student) => sum + parseFloat(student.percentage), 0) / 
            totalStudents
        ).toFixed(2) : "0.00";

        // Calculate assignment-wise statistics
        const assignmentStats = {};
        performanceData.forEach(student => {
            student.assignments.forEach(assignment => {
                if (!assignmentStats[assignment.assignmentNo]) {
                    assignmentStats[assignment.assignmentNo] = {
                        totalMarks: 0,
                        studentCount: 0,
                        average: 0
                    };
                }
                assignmentStats[assignment.assignmentNo].totalMarks += assignment.marks;
                assignmentStats[assignment.assignmentNo].studentCount++;
            });
        });

        // Calculate average for each assignment
        Object.keys(assignmentStats).forEach(assignmentNo => {
            const stat = assignmentStats[assignmentNo];
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