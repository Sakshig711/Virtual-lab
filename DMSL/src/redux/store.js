// import { configureStore } from "@reduxjs/toolkit";
// import quizReducer from "./quizSlice"; // Import the reducer

// export const store = configureStore({
//   reducer: {
//     quiz: quizReducer, // Make sure this matches the slice name
//   },
// });

import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';

export const store = configureStore({
    reducer: {
        quiz: quizReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});