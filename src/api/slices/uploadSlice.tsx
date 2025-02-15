import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../store/utils';

export interface Upload {
  id: string;
  url: string;
  type: 'file' | 'link';
  originalName?: string;
  mimeType?: string;
  size?: number;
  uploadDate: string;
  status: 'pending' | 'completed' | 'failed';
}

interface UploadResponse {
  message: string;
  upload: Upload;
}

 interface GetUploadsResponse {
  uploads: Upload[];
}

export const uploadSlice = createApi({
  reducerPath: 'uploadSlice',
  baseQuery: customBaseQuery,
  tagTypes: ['Upload'],
  endpoints: (builder) => ({
    // Upload file endpoint
    uploadFile: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: '/api/upload/file',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Upload'],
    }),

    // Upload link endpoint
    uploadLink: builder.mutation<UploadResponse, { url: string }>({
      query: (data) => ({
        url: '/api/upload/link',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Upload'],
    }),

    // Get all uploads
    getUploadsFiles: builder.query<GetUploadsResponse, void>({
      query: () => '/api/uploads',
      providesTags: ['Upload'],
    }),

    // Delete upload
    deleteUpload: builder.mutation<{ message: string }, string>({
      query: (uploadId) => ({
        url: `/api/uploads/${uploadId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Upload'],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useUploadLinkMutation,
  useGetUploadsFilesQuery,
  useDeleteUploadMutation,
} = uploadSlice;
