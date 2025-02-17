import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../slices/authSlice';

const BASE_URL = process.env.API_URL || 'http://192.168.0.106:3000'; 
console.log(BASE_URL);


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: async (headers) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      console.log("token>>", token);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return headers;
    }
  },
});


export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  return baseQuery(args, api, extraOptions);
};
