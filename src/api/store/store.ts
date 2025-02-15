import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import { uploadSlice } from '../slices/uploadSlice';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    [uploadSlice.reducerPath]: uploadSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(uploadSlice.middleware),
});

export default store;