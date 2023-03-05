import {configureStore} from '@reduxjs/toolkit';
import { LOGIN } from './actions/LoginActions';
import { initialState } from './initialState';
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [LOGIN]
      }})
    });
