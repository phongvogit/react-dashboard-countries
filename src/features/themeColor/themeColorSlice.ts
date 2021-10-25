import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface ThemeColorState {
  color: string;
}

const initialState: ThemeColorState = {
  color: '',
};

const themeColorSlice = createSlice({
  name: 'themeColor',
  initialState,
  reducers: {
    changeColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
  },
});

//Actions
export const themeColorActions = themeColorSlice.actions;
//Selectors
export const selectthemeColor = (state: RootState) => state.themeColor.color;
//Reducers
const themColorReducer = themeColorSlice.reducer;
export default themColorReducer;
