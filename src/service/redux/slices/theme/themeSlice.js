import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeType: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeType = state.themeType === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.themeType = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
