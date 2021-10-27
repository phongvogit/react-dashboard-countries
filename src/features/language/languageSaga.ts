import { call, put, takeLatest } from '@redux-saga/core/effects';
import languageApi from 'api/languageApi';
import { Language } from 'model';
import { languageActions } from './languageSlice';

function* fetchLanguageList() {
  try {
    const response: Language[] = yield call(languageApi.getAll);
    yield put(languageActions.fetchLanguageListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch city list', error);
    yield put(languageActions.fetchLanguageListFailed());
  }
}

export default function* languageSaga() {
  yield takeLatest(languageActions.fetchLanguageList.type, fetchLanguageList);
}
