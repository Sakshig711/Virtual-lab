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

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No direct reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default quizSlice.reducer;




