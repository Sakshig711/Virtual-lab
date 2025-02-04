import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import "./css/Quiz1.css";

const QuizApp = ({ id }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [formData, setFormData] = useState({
        AssignmentNo: id,
        name: "",
        rollno: "",
        marks: 0,
    });
    const [isRollNoValid, setIsRollNoValid] = useState(true); // Added validation state for roll number

    useEffect(() => {
        const getJsonFile = () => {
            if (id >= 10 && id <= 14) return `/mcq${id - 2}.json`;
            if (id >= 7 && id < 10) return `/mcq7.json`;
            return `/mcq${id}.json`;
        };

        fetch(getJsonFile())
            .then((response) => {
                if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
                return response.json();
            })
            .then((data) => {
                setQuestions(data.sort(() => Math.random() - 0.5));
                setSelectedOptions(Array(data.length).fill("")); // Initialize selected options
            })
            .catch((error) => console.error("Error fetching quiz data:", error));
    }, [id]);

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

        // Check if all questions have been answered
        for (let i = 0; i < questions.length; i++) {
            if (!selectedOptions[i]) {
                toast.error(`Please answer question ${i + 1}`);
                return false;
            }
        }

        return true;
    };

    const calculateScore = () => {
        let tempScore = 0;
        questions.forEach((q, index) => {
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

        setTimeout(async () => {
            try {
                const response = await fetch("http://localhost:3000/quiz-response", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, marks: updatedMarks }),
                });

                const result = await response.json();
                toast.success(result.message);
            } catch (error) {
                toast.error("Error submitting data!");
                console.error("Error sending data to server:", error);
            }
        }, 100); // Small delay to ensure marks update before sending
        setShowResult(true);
    };

    const resetTest = () => {
        setShowResult(false);
        setScore(0);
        setSelectedOptions(Array(questions.length).fill("")); // Reset selected options
    };

    return (
        <div className="content-quiz">
            <ToastContainer /> 
            {!showResult ? (
                <form onSubmit={handleSubmit}>
                    <h2>Quiz</h2>
                    <div className="InputDetails">
                        <div className="NameDiv">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                required
                            />
                        </div>
                        <div className="RollNoDiv">
                            <label htmlFor="rollno">Roll Number:</label>
                            <input
                                type="number"
                                name="rollno"
                                value={formData.rollno}
                                onChange={handleChange}
                                onBlur={validateRollNumber}
                                placeholder="Enter Your Roll Number"
                                required
                            />
                        </div>
                    </div>
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
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
                        <button type="submit" className="submit-btn" disabled={!isRollNoValid}>
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div className="result-container">
                    <h2>Test Completed!</h2>
                    <div>Your score: {score}/{questions.length}</div>
                    <h3>Questions and Answers:</h3>
                    {questions.map((question, index) => (
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
