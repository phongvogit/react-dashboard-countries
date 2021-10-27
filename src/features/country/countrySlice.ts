import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Country, ListParams, PaginationParams, ListResponse } from 'model';

export interface CountryState {
  loading: boolean;
  list: Country[];
  filter: ListParams;
  pagination?: PaginationParams;
}

const initialState: CountryState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 7,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    fetchCountryList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchCountryListSuccess(state, action: PayloadAction<ListResponse<Country>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchCountryListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},

    setCountryIsFavorite(state, action: PayloadAction<Country>) {
      state.list = state.list.map((country) => {
        const check = country.name.localeCompare(action.payload.name);
        if (check === 0) {
          country.isFavorite = !country.isFavorite;
        }
        return country;
      });
    },
  },
});

//Actions
export const countryActions = countrySlice.actions;
//Selectors
export const selectCountryList = (state: RootState) => state.country.list;
export const selectCountryLoading = (state: RootState) => state.country.loading;
export const selectCountryFilter = (state: RootState) => state.country.filter;
export const selectCountryPagination = (state: RootState) => state.country.pagination;

//Reducers
const countryReducer = countrySlice.reducer;
export default countryReducer;
