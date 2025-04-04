import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./css/Quiz1.css";
import axios from "axios";
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

    const fetchExamQuestions = async (examId) => {
        if (!examId) {
            console.error("Invalid exam ID provided.");
            return;
        }


        try {
            const response = await axios.get(`${BASE_URL}/quiz/${examId}`);
            const data = response.data;

            if (data && Array.isArray(data) && data.length > 0) {
                setQuestionsQuiz([...data].sort(() => Math.random() - 0.5));
                setSelectedOptions(Array(data.length).fill(""));
            } else {
                toast.error("No questions found for this quiz.");
                console.warn("No questions found for exam ID:", examId);
                setQuestionsQuiz([]);
            }
        } catch (error) {
            toast.error("Failed to load quiz questions.");
            console.error("Error fetching exam questions:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchExamQuestions(id);
        }
    }, [id]);

    const handleOptionChange = (index, value) => {
        setSelectedOptions((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const validateFormData = () => {
        for (let i = 0; i < questionsQuiz.length; i++) {
            if (!selectedOptions[i]) {
                toast.warn(`Please answer question ${i + 1}`);
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

        if (!validateFormData()) {
            return;
        }

        const updatedMarks = calculateScore();

        try {
            const response = await fetch(`${BASE_URL}/quiz-response`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rollNumber: formData.rollno,
                    name: formData.name,
                    examId: id,
                    score: updatedMarks,
                    totalMarks: questionsQuiz.length // Add this line to include total possible marks
                }),
            });

            const result = await response.json();

            if (result.success) {
                setFormData((prev) => ({ ...prev, marks: updatedMarks }));
                setScore(updatedMarks);
                setShowResult(true);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Error submitting data!");
            console.error("Error sending data to server:", error);
        }
    };

    const resetTest = () => {
        setShowResult(false);
        setScore(0);
        setSelectedOptions(Array(questionsQuiz.length).fill(""));
    };

    const handleLoginClick = () => {
        navigate("/login"); 
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
