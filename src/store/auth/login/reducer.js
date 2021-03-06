import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  successMsg: ""
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: ""
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: ""
      }
      break
    case VERIFY_CODE:
      state = {
        ...state,
        loading: true,
        error: ""
      }
      break
    case VERIFY_CODE_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: ""
      }
      break
    case RESET_PASSWORD:
      state = {
        ...state,
        loading: true,
        error: ""
      }
      break
    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        successMsg: action.payload,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
