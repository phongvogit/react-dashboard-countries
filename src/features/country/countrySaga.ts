import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import countryApi from 'api/countryApi';
import { Country, ListParams, ListResponse } from 'model';
import { countryActions } from './countrySlice';

function* fetchCountryList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Country> = yield call(countryApi.getAll, action.payload);
    const currentItems: Country[] = JSON.parse(localStorage.getItem('items') || '');
    response.data = response.data.map((country) => {
      currentItems.map((item) => {
        const check = item.name.localeCompare(country.name);
        if (check === 0) {
          country.isFavorite = true;
        }
        return item;
      });
      return country;
    });
    yield put(countryActions.fetchCountryListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch country list', error);
    yield put(countryActions.fetchCountryListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(countryActions.setFilter(action.payload));
}

export default function* countrySaga() {
  yield takeLatest(countryActions.fetchCountryList.type, fetchCountryList);
  yield debounce(500, countryActions.setFilterWithDebounce.type, handleSearchDebounce);
}
