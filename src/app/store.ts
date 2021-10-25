import createSagaMiddleware from '@redux-saga/core';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils';
import { combineReducers } from 'redux';
import themColorReducer from 'features/themeColor/themeColorSlice';
import countryReducer from 'features/country/countrySlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  themeColor: themColorReducer,
  country: countryReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
