import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false,role: "user"},
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        changeRole(state, action) {
            const role = action.payload;
            console.log("Role updated:", role);
            state.role = role;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         isLoggedIn: false,
//         role: null,  // Changed from "user" to null
//     },
//     reducers: {
//         login(state) {
//             state.isLoggedIn = true;
//         },
//         logout(state) {
//             state.isLoggedIn = false;
//             state.role = null;  // Clear role on logout
//         },
//         changeRole(state, action) {
//             const role = action.payload;
//             console.log("Role updated:", role);
//             state.role = role;
//         },
//     },
// });

// export const authActions = authSlice.actions;
// export default authSlice.reducer;
