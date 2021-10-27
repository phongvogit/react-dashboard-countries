import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface regionState {
  loading: boolean;
  list: string[];
}

const initialState: regionState = {
  loading: false,
  list: [],
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    fetchRegionList(state) {
      state.loading = true;
    },
    fetchRegionListSuccess(state, action: PayloadAction<string[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchRegionListFailed(state) {
      state.loading = false;
    },
  },
});

//Actions
export const regionActions = regionSlice.actions;
//Selectors
export const selectRegionList = (state: RootState) => state.region.list;
//Reducers
const regionReducer = regionSlice.reducer;
export default regionReducer;
