import axios from 'axios';
import baseUrl from '../constants/baseUrl';

export const API = axios.create({
  baseURL: baseUrl,
});

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const fetchPosts = page => API.get(`/posts?page=${page}`);
export const createPost = newPost => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`posts/${id}`, updatedPost);
export const deletePost = id => API.delete(`posts/${id}`);
export const likePost = id => API.patch(`posts/${id}/likePost`);

export const updateProfile = (id, updatedProfile) =>
  API.patch(`profile/${id}/updateProfile`, updatedProfile);

export const fetchProfile = id => API.get(`/profile/${id}`);

export const postComment = (id, postComment) =>
  API.post(`/posts/${id}/comment`, { postComment });

export const signIn = formData => API.post('/user/signin', formData);
export const signUp = formData => API.post('/user/signup', formData);
