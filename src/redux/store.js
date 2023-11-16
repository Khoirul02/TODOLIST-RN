/* eslint-disable prettier/prettier */
import {configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
const logger = createLogger();
const rootReducers = combineReducers({
  todo: todoReducer,
});
export const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunk, logger),
});
