import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: 30,
  empty: true,
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      const user = action.payload;
      state.content.push(user);
      state.totalElements += 1;
      state.empty = false;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
      return state;
    },
    removeUser: (state, action) => {
      state.content = state.content.filter(
        (user) => user.id !== action.payload.id,
      );
      state.totalElements -= 1;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
      state.empty = state.totalElements === 0;
      return state;
    },
    removeAllUsers: () => {
      return initialState;
    },
  },
});
export const { setUsers, addUser, removeUser, removeAllUsers } =
  userSlice.actions;
export default userSlice.reducer;
