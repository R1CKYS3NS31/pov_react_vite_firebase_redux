import { createSlice } from "@reduxjs/toolkit";

export const accountUserSlice = createSlice({
  name: "accountUser",
  initialState: null,
  reducers: {
    setAccountUser: (state, action) => {
      return action.payload;
    },
    updateAccountUser: (state, action) => {
      const accountUser = {
        token: action.payload.token,
        user: action.payload.user,
      };
      return {
        ...state,
        ...accountUser,
      };
    },

    signOutAccountUser: (state, action) => {
      return null;
    },
  },
});

export const { setAccountUser, updateAccountUser, signOutAccountUser } =
  accountUserSlice.actions;
export default accountUserSlice.reducer;
