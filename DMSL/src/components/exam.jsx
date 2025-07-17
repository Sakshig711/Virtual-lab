import React, { useState, useEffect } from "react";
import "./css/exam.css"; // Import the external CSS
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Quiz = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        fetch(`${BASE_URL}/api/get-all-quiz`)
            .then((response) => response.json())
            .then((data) => setAssignments(data))
            .catch((error) => console.error("Error fetching quizzes:", error));
    }, []);

    const handleEditClick = (assignmentId, question) => {
        setEditingQuestion(question.id);
        setEditedData({
            question: question.question,
            options: [...question.options],
            correctOption: question.correctOption,
        });
    };

    const handleSave = async (assignmentId, questionId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/get-all-quiz/${assignmentId}/questions/${questionId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedData),
                }
            );

            const result = await response.json();
            if (result.success) {
                alert("Question updated successfully!");
                setEditingQuestion(null);

                // Refresh the data
                setAssignments((prev) =>
                    prev.map((assignment) =>
                        assignment.assignmentId === assignmentId
                            ? {
                                  ...assignment,
                                  questions: assignment.questions.map((q) =>
                                      q.id === questionId
                                          ? { ...q, ...editedData }
                                          : q
                                  ),
                              }
                            : assignment
                    )
                );
            }
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    return (
        <div className="container">
            <h1>Assignments</h1>

            <div className="grid">
                {assignments.map((assignment) => (
                    <div
                        key={assignment.assignmentId}
                        className="assignment-box"
                        onClick={() =>
                            setSelectedAssignment(
                                selectedAssignment === assignment.assignmentId
                                    ? null
                                    : assignment.assignmentId
                            )
                        }
                    >
                        Assignment {assignment.assignmentId}
                    </div>
                ))}
            </div>

            {selectedAssignment !== null && (
                <div>
                    <h2>Assignment {selectedAssignment} Questions</h2>
                    <table className="questions-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>Options</th>
                                <th>Correct Answer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments
                                .find(
                                    (a) => a.assignmentId === selectedAssignment
                                )
                                ?.questions.map((q, index) => (
                                    <tr key={index}>
                                        <td>{q.id}</td>
                                        <td>
                                            {editingQuestion === q.id ? (
                                                <input
                                                    type="text"
                                                    value={editedData.question}
                                                    onChange={(e) =>
                                                        setEditedData({
                                                            ...editedData,
                                                            question:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                q.question
                                            )}
                                        </td>
                                        <td>
                                            {editingQuestion === q.id
                                                ? editedData.options.map(
                                                      (opt, i) => (
                                                          <input
                                                              key={i}
                                                              type="text"
                                                              value={opt}
                                                              onChange={(e) => {
                                                                  const newOptions =
                                                                      [
                                                                          ...editedData.options,
                                                                      ];
                                                                  newOptions[
                                                                      i
                                                                  ] =
                                                                      e.target.value;
                                                                  setEditedData(
                                                                      {
                                                                          ...editedData,
                                                                          options:
                                                                              newOptions,
                                                                      }
                                                                  );
                                                              }}
                                                          />
                                                      )
                                                  )
                                                : q.options.map((opt, i) => (
                                                      <span key={i}>{opt}</span>
                                                  ))}
                                        </td>
                                        <td>
                                            {editingQuestion === q.id ? (
                                                <input
                                                    type="text"
                                                    value={
                                                        editedData.correctOption
                                                    }
                                                    onChange={(e) =>
                                                        setEditedData({
                                                            ...editedData,
                                                            correctOption:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <strong>
                                                    {q.correctOption}
                                                </strong>
                                            )}
                                        </td>
                                        <td>
                                            {editingQuestion === q.id ? (
                                                <button
                                                    className="save-button"
                                                    onClick={() =>
                                                        handleSave(
                                                            selectedAssignment,
                                                            q.id
                                                        )
                                                    }
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        handleEditClick(
                                                            selectedAssignment,
                                                            q
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Quiz;
