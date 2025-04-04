import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./css/Quiz1.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizQuestions } from "../redux/quizSlice";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const QuizApp = ({ id }) => {
    const [questionsQuiz, setQuestionsQuiz] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        AssignmentNo: id,
        name: "",
        rollno: "",
        marks: 0,
    });

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem("studentToken");
        if (token) {
            setIsAuthenticated(true);
            // Get student details from localStorage
            const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
            setFormData(prev => ({
                ...prev,
                name: studentData.name || "",
                rollno: studentData.rollNumber || ""
            }));
        }
    }, []);

    const [isRollNoValid, setIsRollNoValid] = useState(true); // Added validation state for roll number
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state) => state.quiz);
    useEffect(() => {
                dispatch(fetchQuizQuestions());
            }, [dispatch]);
 
            const fetchExamQuestions = async (examId) => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/exams/${examId}`); // Replace with actual API URL
                    const data = response.data;

                    if (data && Array.isArray(data.selectedQuestions)) {
                        // Shuffle questions and update state
                        setQuestionsQuiz([...data.selectedQuestions].sort(() => Math.random() - 0.5));
                        setSelectedOptions(Array(data.selectedQuestions.length).fill(""));
                    } else {
                        console.warn("No questions found for exam ID:", examId);
                        setQuestionsQuiz([]);
                    }
                } catch (error) {
                    console.error("Error fetching exam questions:", error);
                }
            };
            useEffect(() => {
                console.log("Quiz ID received:", id);
        
                if (questions && Array.isArray(questions)) {
                    const isMongoId = typeof id === "string" && id.length === 24 && /^[a-f0-9]{24}$/.test(id);
        
                    if (isMongoId) {
                       
                        fetchExamQuestions(id);
                    } else {
                       
                        const getId = () => {
                            if (id >= 10 && id <= 14) return id - 2;
                            if (id >= 7 && id < 10) return 7;
                            return id;
                        };
        
                        // const quizId = getId();
                        const quizId = Number(getId());
                        // console.log("Looking for assignmentId:", quizId);
                        // console.log("questions", questions);
                        const filteredQuiz = questions.find((quiz) => quiz.assignmentId === quizId);
                        // console.log("Filtered Quiz:", filteredQuiz);
                        if (filteredQuiz && Array.isArray(filteredQuiz.questions)) {
                            setQuestionsQuiz([...filteredQuiz.questions].sort(() => Math.random() - 0.5));
                            setSelectedOptions(Array(filteredQuiz.questions.length).fill(""));
                        } else {
                            console.warn("No matching quiz found for assignmentId:", quizId);
                            setQuestionsQuiz([]);
                        }
                    }
                }
            }, [id, questions]);
        
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        setSelectedOptions((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const validateRollNumber = (e) => {
        const rollNo = e.target.value.toString(); // Convert roll number to a string
        if (rollNo.length !== 5 || isNaN(rollNo)) {
            setIsRollNoValid(false);
            toast.error("Roll number must be exactly 5 digits!");
        } else {
            setIsRollNoValid(true);
        }
    };

    // Strict validation function
    const validateFormData = () => {
        // Check if name is provided
        if (!formData.name.trim()) {
            toast.error("Name is required!");
            return false;
        }

        // Check if roll number is exactly 5 digits
        const rollNo = formData.rollno.toString();
        if (rollNo.length !== 5 || isNaN(rollNo)) {
            toast.error("Roll number must be exactly 5 digits!");
            return false;
        }

        
        for (let i = 0; i < questionsQuiz.length; i++) {
            if (!selectedOptions[i]) {
                toast.error(`Please answer question ${i + 1}`);
                return false;
            }
        }

        return true;
    };

    const calculateScore = () => {
        let tempScore = 0;
        questionsQuiz.forEach((q, index) => {
            if (selectedOptions[index] === q.correctOption) tempScore++;
        });
        setScore(tempScore);
        return tempScore;
    };

  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Run strict validation
        if (!validateFormData()) {
            return; // Prevent form submission if validation fails
        }
    
        const updatedMarks = calculateScore();
        setFormData((prev) => ({ ...prev, marks: updatedMarks }));
        // console.log(formData.rollno);
        // console.log(id);
        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/exams/submit-exam`, { // ✅ Adjusted API endpoint
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        rollNumber: formData.rollno, // ✅ Use rollNumber instead of email
                        name: formData.name, // ✅ Pass name
                        examId: id, // ✅ Pass exam ID
                        score: updatedMarks, // ✅ Send computed score
                    }),
                });
    
                const result = await response.json();
    
                if (result.success) {
                    toast.success(result.message);
                    setShowResult(true);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("Error submitting data!");
                console.error("Error sending data to server:", error);
            }
        }, 2000); // Small delay to ensure marks update before sending
    };
    
    const resetTest = () => {
        setShowResult(false);
        setScore(0);
        setSelectedOptions(Array(questionsQuiz.length).fill("")); // Reset selected options
    };

    const handleLoginClick = () => {
        navigate("/student/login"); // Adjust this path according to your routing setup
    };

    if (!isAuthenticated) {
        return (
            <div className="content-quiz">
                <div className="login-prompt">
                    <h2>Please Login to Take the Quiz</h2>
                    <button onClick={handleLoginClick} className="login-btn">
                        Login to Continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="content-quiz">
            <ToastContainer /> 
            {!showResult ? (
                <form onSubmit={handleSubmit}>
                    <h2>Quiz</h2>
                    {/* Remove the input fields for name and roll number since we get them from authentication */}
                    {questionsQuiz.length > 0 ? (
                        questionsQuiz.map((question, index) => (
                            <div key={index} className="question-container">
                                <h3>Question {index + 1}</h3>
                                <div className="question">{question.question}</div>
                                <div className="options">
                                    {question.options.map((option, optIndex) => (
                                        <div key={optIndex} className="option-item">
                                            <input
                                                type="radio"
                                                id={`q${index}_option${optIndex}`}
                                                name={`question${index}`}
                                                value={option}
                                                checked={selectedOptions[index] === option}
                                                onChange={() => handleOptionChange(index, option)}
                                            />
                                            <label htmlFor={`q${index}_option${optIndex}`}>
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading quiz...</p>
                    )}
                    <div className="button">
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div className="result-container">
                    <h2>Test Completed!</h2>
                    <div>Your score: {score}/{questionsQuiz.length}</div>
                    <h3>Questions and Answers:</h3>
                    {questionsQuiz.map((question, index) => (
                        <div key={index} className="question-item">
                            <div>
                                <strong>Question {index + 1}:</strong> {question.question}
                            </div>
                            <div className="options">
                                {question.options.map((option, optIndex) => {
                                    const isCorrect = option === question.correctOption;
                                    const isSelected = option === selectedOptions[index];
                                    const isUserCorrect = selectedOptions[index] === question.correctOption;

                                    let optionClass = isCorrect ? "correct" : isSelected ? "incorrect" : "";
                                    let icon = isCorrect ? "✔️" : isSelected ? "❌" : "";

                                    return (
                                        <div key={optIndex} className={`option-item ${optionClass}`}>
                                            <input
                                                type="radio"
                                                id={`result_q${index}_option${optIndex}`}
                                                name={`result_question${index}`}
                                                value={option}
                                                checked={isSelected}
                                                disabled
                                            />
                                            <label htmlFor={`result_q${index}_option${optIndex}`}>
                                                {option} {icon}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    <button className="reset-btn" onClick={resetTest}>
                        Take Another Test
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizApp;
