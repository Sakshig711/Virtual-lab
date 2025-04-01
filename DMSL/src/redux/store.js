import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice"; // Import the reducer

export const store = configureStore({
  reducer: {
    quiz: quizReducer, // Make sure this matches the slice name
  },
});
