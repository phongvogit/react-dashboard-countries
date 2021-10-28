import countrySaga from 'features/country/countrySaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import languageSaga from 'features/language/languageSaga';
import regionSaga from 'features/region/regionSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([countrySaga(), languageSaga(), regionSaga(), dashboardSaga()]);
}
