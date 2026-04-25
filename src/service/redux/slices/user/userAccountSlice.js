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
      const userAccount = {
        user: action.payload.user || action.payload,
      };
      return {
        ...state,
        ...userAccount,
      };
    },

    removeUserAccount: () => initialState,
  },
});

export const { setUserAccount, editUserAccount, removeUserAccount } =
  userAccountSlice.actions;
export default userAccountSlice.reducer;
