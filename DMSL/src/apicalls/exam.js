import axiosInstance from "./axios";

// add exam
export const addQuestionToExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/add-question-to-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editQuestionById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/edit-question-in-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteQuestionById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/delete-question-in-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
