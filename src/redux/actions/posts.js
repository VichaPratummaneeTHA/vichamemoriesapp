import * as api from '../api/index.js'
import {CREATE, FETCH_ALL, UPDATE_POST, LIKE_POST, DELETE} from '../constants/actionsType'

export const createPost = (newPost) => async(dispatch) => {
  try {
    const {data} = await api.createPost(newPost);
    console.log(data)
    dispatch({
      type: CREATE,
      payload: data
    })

  } catch (error) {
    console.log(error)
  }
}

export const getPosts = () => async (dispatch) => {
  try {
    
    const {data} = await api.fetchPosts();
    console.log(data)
    dispatch({
      type: FETCH_ALL,
      payload: data
    })
    
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, updatePost) => async (dispatch) => {
  try {
    const {data} = await api.updatePost(id, updatePost)
 
    dispatch({
      type: UPDATE_POST,
      payload: data
    })
  } catch (error) {
    console.log(error)
    
  }
}

export const likePost = id => async (dispatch) => {
  try {
    const {data} = await api.likePost(id);

    dispatch({
      type: LIKE_POST,
      payload: data
    })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = id => async (dispatch) => {
  try {
    await api.deletePost(id)

    dispatch({
      type: DELETE,
      payload: id
    })
  } catch (error) {
    console.log(error)
  }
}

