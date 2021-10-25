import countrySaga from 'features/country/countrySaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  console.log('root Saga');
  yield all([countrySaga()]);
}
