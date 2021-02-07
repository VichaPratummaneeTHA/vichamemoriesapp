import {
  AUTH, LOGOUT
} from '../constants/actionsType'

export default function switchAuthCase (state = {authData: null}, action){

  // const {type, data} = action

  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({
        ...action?.data
      }))
      return {...state, authData: action?.data}

    case LOGOUT:
      localStorage.clear()
      return {...state, authData: null}
    default:
      return state
  }
}