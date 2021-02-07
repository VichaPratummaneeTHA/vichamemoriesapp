import {CREATE, FETCH_ALL, UPDATE_POST, LIKE_POST, DELETE} from '../constants/actionsType'
export default function switchPostCase (posts = [], action){

  const {type, payload} = action

  switch (type) {
    case CREATE:
      return [...posts, payload]
    case FETCH_ALL:
      return payload
    case UPDATE_POST:
    case LIKE_POST:  
      return posts.map(p => (p._id === payload._id ? (payload) : (p)))
    case DELETE:
      return posts.filter(p => (p._id !== payload))  
    default:
      return posts
  }
}