import { configureStore } from "@reduxjs/toolkit"
import { loginApi } from "./slices/login/login"
import loginReducer from "./slices/login"
import usersReducer from "./slices/users"
import notesReducer from "./slices/notes"


export const store = configureStore({
    reducer: {
        users: usersReducer,
        notes: notesReducer,
        login: loginReducer,
        [loginApi.reducerPath]: loginApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware)
})