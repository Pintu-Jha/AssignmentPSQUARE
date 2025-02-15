import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store/store';
import { loadAuthState } from './authSlice';

export const initializeApp = createAsyncThunk<
  void, 
  void, 
  { dispatch: AppDispatch; state: RootState } 
>(
  'app/initializeApp',
  async (_, { dispatch }) => {
    try {
      console.log('Initializing app...');
      await dispatch(loadAuthState()).unwrap();
    } catch (error) {
      console.error('Error during app initialization:', error);
      throw error; // Re-throw the error to handle it in the calling component
    }
  }
);
