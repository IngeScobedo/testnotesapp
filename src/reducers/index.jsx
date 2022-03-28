import { configureStore } from "@reduxjs/toolkit"
import { loginApi } from "./slices/login/login"
import loginReducer from "./slices/login"
import notesReducer from "./slices/notes"


export const store = configureStore({
    reducer: {
        notes: notesReducer,
        login: loginReducer,
        [loginApi.reducerPath]: loginApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware)
})