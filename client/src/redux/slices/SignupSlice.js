import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  gender: "",
};

export const SignupSlice = createSlice({
  name: "UserDataSignup",
  initialState,
  reducers: {
    setNameR: (state, action) => {
      state.name = action.target.value;
    },
    setEmailR: (state, action) => {
      state.email = action.target.value;
    },
    setPasswordR: (state, action) => {
      state.password = action.target.value;
    },
    setConfirmPasswordR: (state, action) => {
      state.confirmPassword = action.target.value;
    },
    setDobR: (state, action) => {
      state.dob = action.target.value;
    },
    setGenderR: (state, action) => {
      state.gender = action.target.value;
    },
    reset: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
      state.dob = "";
      state.gender = "";
    },
  }
})