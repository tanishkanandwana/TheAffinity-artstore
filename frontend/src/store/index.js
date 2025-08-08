import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});


// const dummyReducer = (state = {}, action) => state;

// const store = configureStore({
//     reducer: {
//         dummy: dummyReducer
//     },
// });


export default store; 