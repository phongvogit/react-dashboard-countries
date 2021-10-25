import createSagaMiddleware from '@redux-saga/core';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cartReducer from 'features/cart/cartSlice';
import countryReducer from 'features/country/countrySlice';
import themColorReducer from 'features/themeColor/themeColorSlice';
import { combineReducers } from 'redux';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  themeColor: themColorReducer,
  country: countryReducer,
  cart: cartReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
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
