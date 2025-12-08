import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),

    getPostById: builder.query({
      query: id => `/posts/${id}`,
    }),

    createPost: builder.mutation({
      query: body => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation} =
  postApi;
