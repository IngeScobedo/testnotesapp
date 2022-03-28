import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    error: null,
    isAuthenticated: false,
    token: null,
    user: {
      name: null,
      email: null,
      password: null,
    },
    isChangeSuccess: null,
    isRecoverySuccess: null,
    isChangingPassword: false,
  },
  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    loginPending: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    recoverySuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      (state.isRecoverySuccess = true), (state.token = action.payload.token);
      state.isChangingPassword = true;
    },
    resetRecoverySuccess: (state, action) => {
      state.isRecoverySuccess = null;
    },
    recoveryError: (state, action) => {
      state.isLoading = false;
      state.recoveryError = action.payload;
    },
    changeSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isRecoverySuccess = null;
      state.isChangeSuccess = true;
      state.isChangingPassword = false;
    },
  },
});

export const {
  logout,
  loginPending,
  loginSuccess,
  loginError,
  recoverySuccess,
  recoveryError,
  changeSuccess,
  resetRecoverySuccess,
} = loginSlice.actions;

export default loginSlice.reducer;
