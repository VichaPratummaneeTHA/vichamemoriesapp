import axios from 'axios'

const API = axios.create({
  baseURL: 'https://vichamemoriesapp.herokuapp.com/'
})

API.interceptors.request.use( req => {
  if(localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req;
})

//---CRUD---//

//Posts
export const createPost = (newPost) => API.post('/posts', newPost)
export const fetchPosts = () => API.get('/posts');
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

//User
export const signin = (formData) => API.post('/user/signin', formData)
export const signup = (formData) => API.post('/user/signup', formData)

// http://localhost:5000/posts
// const URL = 'http://localhost:5000/posts'