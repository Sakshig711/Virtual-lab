import React, { useState, useEffect } from "react";
import './css/Quiz1.css';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const shuffleQuestions = (questions) => {
    return [...questions].sort(() => Math.random() - 0.5);
  };
  const location = useLocation();
  const { id} = location.state || {};
  console.log(id);

  useEffect(() => {
    // const getJsonFile = () => `/mcq${id}.json`;
    const getJsonFile = () => {
      if (id >=  10&& id <= 14) {
        return `/mcq${id - 2}.json`; // Adjusted for ids 7 to 14
      }else if(id>=7 && id<10){
        return `/mcq7.json`;
      }
      return `/mcq${id}.json`; // For ids other than 7 to 14
    };
    const jsonFile = getJsonFile();

    fetch(jsonFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching quiz data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuestions(shuffleQuestions(data));
        setSelectedOptions(Array(data.length).fill(""));
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, [id]);

  const handleOptionChange = (questionIndex, optionValue) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionValue;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateScore();
    setShowResult(true);
  };

  const calculateScore = () => {
    let tempScore = 0;
    questions.forEach((q, index) => {
      if (selectedOptions[index] === q.correctOption) {
        tempScore++;
      }
    });
    setScore(tempScore);
  };

  const resetTest = () => {
    setQuestions(shuffleQuestions(questions));
    setSelectedOptions(Array(questions.length).fill(""));
    setScore(0);
    setShowResult(false);
  };

  const renderQuiz = () => (
    <form onSubmit={handleSubmit}>
      <h2>Quiz</h2>
      {questions.map((question, index) => (
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
                <label htmlFor={`q${index}_option${optIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="button">
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );

  const renderResult = () => (
    <div className="result-container">
      <h2>Test Completed!</h2>
      <div>Your score: {score}/{questions.length}</div>
      <h3>Questions and Answers:</h3>
      {questions.map((question, index) => (
        <div key={index} className="question-item">
          <div><strong>Question {index + 1}:</strong> {question.question}</div>
          <div className="options">
            {question.options.map((option, optIndex) => {
              const isCorrect = option === question.correctOption;
              const isSelected = option === selectedOptions[index];
              const isUserCorrect = selectedOptions[index] === question.correctOption;

              let optionClass = "";
              let icon = "";

              if (isCorrect) {
                optionClass = "correc";
                icon = "✔️";
              }

              if (isSelected) {
                if (isUserCorrect) {
                  optionClass = "correc";
                  icon = "✔️";
                } else {
                  optionClass = "incorrec";
                  icon = "❌";
                }
              }

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
                    {option}
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
  );

  return <div className="content-quiz">{!showResult ? renderQuiz() : renderResult()}</div>;
};

export default QuizApp;
