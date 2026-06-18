import { configureStore } from '@reduxjs/toolkit';
import { apiClient } from './apiClient/apiClient';
import authReducer from './features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [apiClient.reducerPath]: apiClient.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiClient.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
