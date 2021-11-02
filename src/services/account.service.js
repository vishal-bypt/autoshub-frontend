import { BehaviorSubject } from 'rxjs';

import config from '../config';
import { fetchWrapper, history } from '../helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;
const baseUrl2 = `${config.apiUrl}`;


export const accountService = {
    login,
    verifyCode,
    resendVerificationCode,
    logout,
    refreshToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getUserList,
    getManagerList,
    getUsersByManagerId,
    getById,
    create,
    update,
    uploadUsersExcel,
    delete: _delete,
    assignUser: assignUser,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value ? userSubject.value : JSON.parse(localStorage.getItem('authUser')) }
};

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function verifyCode(accountId, accountVerificationCode) {
    return fetchWrapper.post(`${baseUrl}/verifyCode`, { accountId, accountVerificationCode })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function resendVerificationCode(accountId) {
    return fetchWrapper.post(`${baseUrl}/resendVerificationCode`, { accountId })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    //fetchWrapper.post(`${baseUrl}/revoke-token`, {});
    stopRefreshTokenTimer();
    localStorage.clear();
    userSubject.next(null);
    history.push('/login');
    window.location.href = "/login";
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
    return fetchWrapper.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
}

function getAll(limit, offset, searchValue) {
    // return fetchWrapper.get(`${baseUrl}`);
    return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
}

function getUserList() {
    return fetchWrapper.get(`${baseUrl}/getUserList`);
}

function getManagerList() {
    return fetchWrapper.get(`${baseUrl}/getManagerList`);
}

function getUsersByManagerId(id) {
    return fetchWrapper.get(`${baseUrl2}/assignTask/${id}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value && userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        });
}

function assignUser(data) {
    return fetchWrapper.post(`${baseUrl2}/assignTask`, data);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

function uploadUsersExcel(params) {
    return fetch(`${baseUrl}/uploadUsersExcel`,
        {
            body: params,
            method: "post"
        }).then(response => response.json());
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    if (userSubject.value.jwtToken) {
        const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        refreshTokenTimeout = setTimeout(refreshToken, timeout);
    }
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}


