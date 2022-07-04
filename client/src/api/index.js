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
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);

export const updateProfile = (id, formData) =>
  API.patch(`/users/${id}/updateProfile`, formData);

export const fetchUserWithPost = (id, page) =>
  API.get(`/users/${id}/posts?page=${page}`);
export const fetchAllProfile = page => API.get(`/users?page=${page}`);
export const fetchUser = id => API.get(`/users/${id}/user`);
export const fetchAllUsers = page => API.get(`/users/users/all?page=${page}`);

export const postComment = (id, postComment) =>
  API.post(`/posts/${id}/comment`, { postComment });
export const updateComment = (id, commentData) =>
  API.patch(`/posts/${id}/updateComment`, { commentData });
export const deleteComment = id => API.delete(`/posts/${id}/deleteComment`);

export const followUser = id => API.patch(`/users/${id}/follow`);
export const unFollowUser = id => API.patch(`/users/${id}/unfollow`);
export const fetchFollowersById = id => API.get(`/users/${id}/followers`);
export const fetchFollowingById = id => API.get(`/users/${id}/following`);

export const signIn = formData => API.post('/auth/signin', formData);
export const signUp = formData => API.post('/auth/signup', formData);
export const authUser = () => API.get(`/auth/login/user`);
