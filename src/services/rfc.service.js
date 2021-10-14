import { BehaviorSubject } from 'rxjs';

import config from '../config';
import { fetchWrapper, history } from '../helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/rfcForm`;

export const rfcService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    exportData,
    dashboard,
    getCountries,
    uploadPreRequisitesData,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};


function getAll(filter=null) {
    if(filter == null){
        return fetchWrapper.get(`${baseUrl}/?filterType=my&selectType=Imp`);
    } else {
        return fetchWrapper.get(`${baseUrl}/?filterType=${filter}&selectType=Imp`);
    }
    
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getCountries(){
    return fetchWrapper.get(`${baseUrl}/country`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(user => { console.log("user", user);return false;
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then();
}

// helper functions

let refreshTokenTimeout;

/* function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}
 */
function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}

/* function storeRfp(data) {
    return fetchWrapper.post(`${baseUrl}/rfcForm`, { data })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
} */

function exportData(filter='all') {
    return fetchWrapper.get(`${baseUrl}/export?filterType=${filter}&selectType=all`);
}
function uploadPreRequisitesData(formData,id) {
    console.log(formData)
    return fetch(`${baseUrl}/upload/${id}`,
        {
            body: formData,
            method: "post"
        });
    // return fetchWrapper.post(`${baseUrl}/upload`,{formData});
}

function dashboard() {
    return fetchWrapper.get(`${baseUrl}/dashboard`);
}
