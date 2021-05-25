import axios from 'axios';
import { ISignUp, ILogIn, IUpdateUser, IPostData, IThreadData, ICommentData } from './apiInterface';

const API = axios.create();

// Thread API Routes
export const fetchAllThreads = () => API.get('/threads');
export const fetchThread = (title: string) => API.get(`/threads/${title}`);
export const createThread = (threadData: IThreadData) => API.post('/threads/create', threadData);
export const updateThread = (title: string, threadData: IThreadData) => API.patch('/threads/update', { title, threadData });


// Posts API Routes
export const fetchAllPosts = () => API.get('/posts');
export const fetchPost = (id: string) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (title?: string, tags?: string) => API.get(`/posts/search?title=${title}&tags=${tags}`);
export const createPost = (postData: IPostData) => API.post('/posts/create', postData);
export const updatePost = (id: string, updatedPost: IPostData) => API.patch('/posts/update', { id, updatedPost });
export const reactPost = (id: string, action: 'like' | 'dislike') => API.patch(`/posts/react?id=${id}&action=${action}`);
export const deletePost = (id: string) => API.delete(`/posts/delete?id=${id}`);


// Comments API Routes
export const fetchComment = (commentId: string) => API.get('/comments/' + commentId);
export const fetchCommentBySearch = (postId?: string, userId?: string) => API.get(`/comments/search?postId=${postId}&userId=${userId}`);
export const createComment = (postId: string, comment: ICommentData) => API.post(`/comments/create?postId=${postId}`, comment);
export const updateComment = (commentId: string, comment: ICommentData) => API.patch(`/comments/update`, { id: commentId, comment });
export const reactComment = (commentId: string, action: 'like' | 'dislike') => API.patch(`/comments/react?commentId=${commentId}&action=${action}`);
export const deleteComment = (commentId: string, postId: string) => API.delete(`/comments/delete?postId=${postId}&commentId=${commentId}`);


// User API Routes
export const logout = () => API.post('/user/logout');
export const login = (loginData: ILogIn) => API.post('/user/login', loginData);
export const signUp = (signupData: ISignUp) => API.post('/user/signup', signupData);
export const getUser = (username: string) => API.get(`/user?username=${username}`);
export const updateUser = (updateData: IUpdateUser) => API.patch('/user/update', updateData);
export const checkAuthenticated = () => API.post('/user/check');