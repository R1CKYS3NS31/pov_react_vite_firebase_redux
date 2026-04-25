import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0, // Current page
  last: true,
  size: 30,
  empty: true,
};

export const povSlice = createSlice({
  name: "povs",
  initialState: initialState,
  reducers: {
    setPovs: (state, action) => {
      return action.payload;
    },
    addPoV: (state, action) => {
      const pov = action.payload;
      // state.push(pov);
      state.content.unshift(pov);
      state.totalElements += 1;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
      state.last = state.number === state.totalPages - 1;
      state.empty = false;
    },
    editPoV: (state, action) => {
      const updatedPoV = action.payload;
      const index = state.content.findIndex((p) => p.id === updatedPoV.id);
      if (index !== -1) {
        state.content[index] = updatedPoV;
      }
    },
    removePov: (state, action) => {
      const povIdToDelete = action.payload;
      state.content = state.content.filter(
        (existingPoV) => existingPoV.id !== povIdToDelete,
      );
      state.totalElements -= 1;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
      state.last = state.number === state.totalPages - 1;
      state.empty = state.totalElements === 0;
    },
    removeAllPoVs: () => initialState,
  },
});

export const {
  setPovs,
  addPoV,
  editPoV,
  removePov,
  removeAllPoVs,
} = povSlice.actions;

export default povSlice.reducer;
