import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchQuizQuestions = createAsyncThunk(
    "quiz/fetchQuestions",
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/get-all-quiz`);
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
                state.error = null;
                console.log("State after update:", state.questions);
            })
            .addCase(fetchQuizQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.questions = [];
            });
    },
});

export default quizSlice.reducer;
