import { useSelector } from "react-redux";

const QuizApp = ({ id }) => {
    const allQuestions = useSelector((state) => state.quiz.questions);

    console.log("Redux Questions:", allQuestions); // Debugging
};
