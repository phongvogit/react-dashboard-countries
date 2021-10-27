import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Language } from 'model';

interface languageState {
  loading: boolean;
  list: Language[];
}

const initialState: languageState = {
  loading: false,
  list: [],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    fetchLanguageList(state) {
      state.loading = true;
    },
    fetchLanguageListSuccess(state, action: PayloadAction<Language[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchLanguageListFailed(state) {
      state.loading = false;
    },
  },
});

//Actions
export const languageActions = languageSlice.actions;
//Selectors
export const selectLanguageList = (state: RootState) => state.language.list;
//Reducers
const languageReducer = languageSlice.reducer;
export default languageReducer;
