import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface ThemeColorState {
  isDark: boolean;
}

const initialState: ThemeColorState = {
  isDark: false,
};

const themeColorSlice = createSlice({
  name: 'themeColor',
  initialState,
  reducers: {
    changeColor(state) {
      state.isDark = !state.isDark;
      localStorage.setItem('isDark', JSON.stringify(state.isDark));
    },

    fetchThemeColorFromLocalStorage(state) {
      if (!localStorage.getItem('isDark')) return;
      const isDark = JSON.parse(localStorage.getItem('isDark') || '');
      state.isDark = isDark;
    },
  },
});

//Actions
export const themeColorActions = themeColorSlice.actions;
//Selectors
export const selectThemeColor = (state: RootState) => state.themeColor.isDark;
//Reducers
const themColorReducer = themeColorSlice.reducer;
export default themColorReducer;
