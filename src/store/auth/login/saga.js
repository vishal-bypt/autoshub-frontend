import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, RESET_PASSWORD, SOCIAL_LOGIN, VERIFY_CODE } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess, resetPasswordSuccess, verifyCodeSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  postJwtVerifyCode,
  postJwtResetPwd
} from "../../../helpers/fakebackend_helper"
import { Role, hasAdminView, hasManagerView, hasUserView, hasExecView, rolesArray, setCurrentUserRole } from "../../../helpers"


const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      )
      yield put(loginSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      })
      // response.userRoleArray = rolesArray(response.userRole);
      console.log("loginUser response::", response)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      })
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    // history.push("/dashboard")
    history.push("/page-two-step-verification")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* verifyCode({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      )
      yield put(loginSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log("user::", user)
      const response = yield call(postJwtVerifyCode, {
        accountId: user.accountId,
        accountVerificationCode: user.accountVerificationCode,
      })
      response.userRoleArray = rolesArray(response.userRole);
      if (hasAdminView(response.userRole)) {
        setCurrentUserRole(Role.Admin);
      }
      else if (hasManagerView(response.userRole)) {
        setCurrentUserRole(Role.Manager);
      }
      else if (hasUserView(response.userRole)) {
        setCurrentUserRole(Role.User);
      }
      else if (hasExecView(response.userRole)) {
        setCurrentUserRole(Role.Exec);
      }
      console.log("verifyCode response::", response)

      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(verifyCodeSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      })
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/landing")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* resetPassword({ payload: { data, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {

    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtResetPwd, {
        token: data.token,
        password: data.password
      })
      if (response) {
        yield put(
          resetPasswordSuccess(response.message)
        )
        history.push("/login")
      }
    } else {

    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      )
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/landing")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(VERIFY_CODE, verifyCode)
  yield takeEvery(RESET_PASSWORD, resetPassword)
}

export default authSaga