import { combineReducers } from "@reduxjs/toolkit";
import povSlice from "../slices/pov/povSlice";
import userSlice from "../slices/user/userSlice";
import accountUserSlice from "../slices/user/accountUserSlice";

export const rootReducer = combineReducers({
  accountUser: accountUserSlice,
  users: userSlice,
  povs: povSlice,
});
