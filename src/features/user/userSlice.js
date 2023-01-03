import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  fullName: "",
  dl: false,
  dlNumber: "",
  dob: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
    removeUserData: (state) => {
      return initialState;
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;

export const user = (state) => state.user;

export default userSlice.reducer;
