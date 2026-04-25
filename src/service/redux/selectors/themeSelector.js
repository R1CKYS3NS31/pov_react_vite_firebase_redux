// import { createSelector } from "@reduxjs/toolkit";

// const themeSelector = createSelector(
//   (state) => state.theme?.themeType,
//   (themeType) => themeType
// );

// export default themeSelector;

export const themeSelector = (state) => state.theme?.themeType || "light";