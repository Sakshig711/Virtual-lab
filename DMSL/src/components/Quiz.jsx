import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Lisbon"],
      correctAnswer: "Paris",
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
      correctAnswer: "Albert Einstein",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
    },
    {
      question: "What element does 'O' represent in the periodic table?",
      options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
      correctAnswer: "Oxygen",
    },
    {
      question: "Which programming language is mainly used for web development?",
      options: ["Python", "C++", "JavaScript", "Ruby"],
      correctAnswer: "JavaScript",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "George Orwell", "Ernest Hemingway"],
      correctAnswer: "Harper Lee",
    },
    {
      question: "Which ocean is the largest by surface area?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correctAnswer: "2",
    },
    {
      question: "What is the main component of the sun?",
      options: ["Helium", "Oxygen", "Carbon", "Hydrogen"],
      correctAnswer: "Hydrogen",
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correctAnswer: "Japan",
    },
  ];

  const handleAnswerClick = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const checkAnswer = (option) => {
    if (!showResults) return '';
    return option === questions[currentQuestionIndex].correctAnswer
      ? 'correct'
      : selectedAnswers[currentQuestionIndex] === option
      ? 'incorrect'
      : '';
  };

  const handleSubmit = () => {
    setShowResults(true); 
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setShowResults(false); 
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    setShowResults(false);
  };

  return (
    <div className="rectangle-container">
      <div className="rectangle-content">
        <p><b>Q{currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}</b></p>
        
        <div className="options-container">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${checkAnswer(option)} ${
                selectedAnswers[currentQuestionIndex] === option ? 'marked' : ''
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={showResults}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="navigation-buttons">
          <button
            className="previous-button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          {!showResults && selectedAnswers[currentQuestionIndex] && (
            <button className="submit-button" onClick={handleSubmit}>
              Submit Answer
            </button>
          )}

          <button
            className="next-button"
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
