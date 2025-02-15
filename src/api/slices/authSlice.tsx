import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
}

// Define Auth State Type
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Constants for AsyncStorage keys
export const STORAGE_KEYS = {
  USER: 'user',
  ACCESS_TOKEN: 'accessToken',
};

// Define Login & Signup Credentials Type
interface AuthCredentials {
  name?: string; // Required for signup, optional for login
  email: string;
  password: string;
}

// **Thunk for User Signup**
export const signupUser = createAsyncThunk<
  { user: User; token: string }, // Return Type
  AuthCredentials, // Input Type
  { rejectValue: string } // Error Handling Type
>('auth/signup', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed.');
    }

    const data = await response.json();
    console.log(data);
    

    // Save User & Token in AsyncStorage
    const userStorageData: [string, string][] = [
      [STORAGE_KEYS.USER, JSON.stringify(data.user)],
      [STORAGE_KEYS.ACCESS_TOKEN, data.token],
    ];
    await AsyncStorage.multiSet(userStorageData);

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Signup failed');
  }
});

// **Thunk for User Login**
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  AuthCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    // console.log("data>>",data);
    

    if (!response.ok) {
      return rejectWithValue(data.message || 'Login failed.');
    }

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.USER, JSON.stringify(data.user)],
      [STORAGE_KEYS.ACCESS_TOKEN, data.token],
    ]);

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Login failed');
  }
});

// **Thunk to Load Authentication State**
export const loadAuthState = createAsyncThunk<
  { user: User | null; token: string | null; isAuthenticated: boolean },
  void,
  { rejectValue: string }
>('auth/loadAuthState', async (_, { rejectWithValue }) => {
  try {
    const [userStr, token] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.USER),
      AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    ]);

    if (userStr && token) {
      try {
        const user: User = JSON.parse(userStr);
        return { user, token, isAuthenticated: true };
      } catch (error) {
        throw new Error('Corrupted user data in storage');
      }
    }

    return { user: null, token: null, isAuthenticated: false };
  } catch (error) {
    return rejectWithValue('Failed to load authentication state');
  }
});

// **Slice for Authentication**
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{ user: User | null; token: string | null; isAuthenticated: boolean }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Signup failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      })
      .addCase(loadAuthState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload ?? 'Failed to load auth state';
      });
  },
});

// **Export Actions & Reducer**
export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
