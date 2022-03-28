import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        isLoading: false,
        error: null,
        users: {}
    },
    reducers: {
        usersPending: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        usersSuccess: (state, action) => {
            state.isLoading = false
            state.error = null
            state.users[action.payload.token] = action.payload.user
        },
        usersError: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const { usersPending, usersSuccess, usersError } = usersSlice.actions

export default usersSlice.reducer