import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import countryApi from 'api/countryApi';
import { Country, ListParams, ListResponse } from 'model';
import { countryActions } from './countrySlice';

function* fetchCountryList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Country> = yield call(countryApi.getAll, action.payload);
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
