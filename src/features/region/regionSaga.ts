import { call, put, takeLatest } from '@redux-saga/core/effects';
import regionApi from 'api/regionApi';
import { regionActions } from './regionSlice';

function* fetchRegionList() {
  try {
    const response: string[] = yield call(regionApi.getAll);
    yield put(regionActions.fetchRegionListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch city list', error);
    yield put(regionActions.fetchRegionListFailed());
  }
}

export default function* regionSaga() {
  yield takeLatest(regionActions.fetchRegionList.type, fetchRegionList);
}
