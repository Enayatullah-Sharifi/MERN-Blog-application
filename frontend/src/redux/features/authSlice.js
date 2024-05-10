import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Register Reducers
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Login Reducers
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // logout reducers
    logoutStart: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.userInfo = null;
      localStorage.setItem("userInfo", null);
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // logout reducers
    updateUserStart: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} = authSlice.actions;
