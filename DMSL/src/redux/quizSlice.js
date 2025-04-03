import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure this is set in `.env`

// Async thunk to fetch quiz questions
export const fetchQuizQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/get-all-quiz`);
      return response.data.sort(() => Math.random() - 0.5); // Shuffle questions
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch questions");
    }
  }
);
  
// import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: [],
  loading: false,
  error: null
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setQuizzes, setLoading, setError } = quizSlice.actions;
export default quizSlice.reducer;




