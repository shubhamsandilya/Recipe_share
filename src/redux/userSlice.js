import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("userInfo")) || {},
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

export function Login(user) {
  return (dispatch) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    dispatch(login(user));
  };
}

export function Logout() {
  return (dispatch) => {
    dispatch(logout());
  };
}
