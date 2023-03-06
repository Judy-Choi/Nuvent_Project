import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reviewStore from './reviewStore';

const rootReducer = combineReducers({
  reviewStore,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefailtMiddleware =>
    getDefailtMiddleware({ serializableCheck: false }),
});

export default store;
