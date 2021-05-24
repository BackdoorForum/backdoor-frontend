import axios from "axios";
import { ISignUp, ILogIn, IUpdateUser, IPostData, IThreadData } from './apiInterface';

const API = axios.create();

// Thread API Routes
export const fetchAllThreads = () => API.get('/threads');
export const fetchThread = (title: string) => API.get(`/threads/${title}`);
export const createThread = (threadData: IThreadData) => API.post('/threads/create', threadData);

// Posts API Routes
export const fetchAllPosts = () => API.get('/posts');
export const fetchPost = (id: string) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (title?: string, tags?: string) => API.get(`/posts/search?title=${title}&tags=${tags}`);
export const createPost = (postData: IPostData) => API.post('/posts/create', postData);
export const updatePost = (id: string, updatedPost: IPostData) => API.patch('/posts/update', { id, updatedPost });
export const reactPost = (id: string, action: 'like' | 'dislike') => API.patch(`/posts/react?id=${id}&action=${action}`);
export const deletePost = (id: string) => API.delete(`/posts/delete?id=${id}`);

// User API Routes
export const logout = () => API.post('/user/logout');
export const login = (loginData: ILogIn) => API.post('/user/login', loginData);
export const signUp = (signupData: ISignUp) => API.post('/user/signup', signupData);
export const getUser = (username: string) => API.get(`/user?username=${username}`);
export const updateUser = (updateData: IUpdateUser) => API.patch('/user/update', updateData);
export const checkAuthenticated = () => API.post("/user/check");