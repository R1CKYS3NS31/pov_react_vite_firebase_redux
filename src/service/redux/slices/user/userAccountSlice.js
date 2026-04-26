import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:{
    first: "Guest",
    last: "User",
    full: "Guest User",
  },
  email: null,
  displayPicture: null,
  description: "I am a new PoV supporter ready to explore different perspectives!",
}

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState : initialState,
  reducers: {
    setUserAccount: (state, action) => {
      return action.payload;
    },
    editUserAccount: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    removeUserAccount: () => initialState,
  },
});

export const { setUserAccount, editUserAccount, removeUserAccount } =
  userAccountSlice.actions;
export default userAccountSlice.reducer;
