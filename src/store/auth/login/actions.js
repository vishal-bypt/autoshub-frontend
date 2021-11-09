import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
} from "./actionTypes"

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}

export const verifyCode = (user, history) => {
  return {
    type: VERIFY_CODE,
    payload: { user, history },
  }
}

export const verifyCodeSuccess = user => {
  return {
    type: VERIFY_CODE_SUCCESS,
    payload: user,
  }
}

export const resetPassword = (data, history) => {
  return {
    type: RESET_PASSWORD,
    payload: { data, history },
  }
}

export const resetPasswordSuccess = (data, history) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: { data, history },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}
