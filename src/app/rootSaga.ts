import countrySaga from 'features/country/countrySaga';
import languageSaga from 'features/language/languageSaga';
import regionSaga from 'features/region/regionSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  console.log('root Saga');
  yield all([countrySaga(), languageSaga(), regionSaga()]);
}
