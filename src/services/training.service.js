import config from '../config';
import { fetchWrapper } from '../helpers';

//const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/training`;
const baseUrl2 = `${config.apiUrl}/trainingAssign`
const baseUrl3 = `${config.apiUrl}/trainingPreRequisites`
const baseUrl4 = `${config.apiUrl}/trainingNominations`
export const trainingService = {
    getAll,
    exportData,
    getById,
    create,
    update,
    uploadExcel,
    delete: _delete,
    assignTraining,
    nominateTraining,
    getUserByTrainingId,
    listTaskToUser,
    listTaskToUsers,
    getTrainingByRole,
    acceptOrRejectPreRequisites,
    getActiveTrainingList,
    getAcceptedAdminTrainingList,
    viewPreRequisites,
    getTrainingReport,
    acceptPreRequisites
    /* rejectPreRequisites,
    acceptPreRequisites, */
    //user: userSubject.asObservable(),
    //get userValue () { return userSubject.value }
};

function viewPreRequisites(id, userId) {
    return fetchWrapper.get(`${baseUrl3}/${id}/${userId}`);
}

function acceptOrRejectPreRequisites(params) {
    return fetchWrapper.put(`${baseUrl3}/acceptOrRejectPreRequisites/`, params)
        .then(user => {
            // update stored user if the logged in user updated their own record
            /* if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            } */
            return user;
        });
}

function rejectPreRequisites() {
    return fetchWrapper.get(`${baseUrl3}/rejectPreRequisites`);
}

function acceptPreRequisites(data) {
    return fetchWrapper.post(`${baseUrl4}/acceptPreRequisites`, data);
}

function getTrainingByRole() {
    return fetchWrapper.get(`${baseUrl}/getTrainingByRole`);
}

function listTaskToUser() {
    return fetchWrapper.get(`${baseUrl2}/listTaskToUser`);
}

function listTaskToUsers() {
    return fetchWrapper.get(`${baseUrl2}/listTaskToUsers`);
}

function getUserByTrainingId(id) {
    return fetchWrapper.get(`${baseUrl2}/${id}`);
}

function assignTraining(data) {
    return fetchWrapper.post(`${baseUrl2}`, data);
}

function nominateTraining(data) {
    return fetchWrapper.post(`${baseUrl2}/nominate`, data);
}

function uploadExcel(params, id) {
    //params = { 'filePath' : params} 
    return fetch(`${baseUrl}/uploadExcel/${id}`,
        {
            body: params,
            method: "post"
        });
    //fetchWrapper.post(`${baseUrl}/uploadExcel/${id}`,params);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function exportData(filter = 'all') {
    return fetchWrapper.get(`${baseUrl}/exportTraning?filterType=${filter}&selectType=all`);
}

function getActiveTrainingList() {
    return fetchWrapper.get(`${baseUrl}/getActiveTrainingList`);
}

function getAcceptedAdminTrainingList() {
    return fetchWrapper.get(`${baseUrl}/getAcceptedAdminTrainingList`);
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
            /* if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            } */
            return user;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            /* if (id === userSubject.value.id) {
                logout();
            } */
            console.log("x == ", x);
            return x;
        });
}

function getTrainingReport() {
    return fetchWrapper.get(`${baseUrl}/getTrainingReport`);
}
// helper functions


// let refreshTokenTimeout;

// function startRefreshTokenTimer() {
//     // parse json object from base64 encoded jwt token
//     const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

//     // set a timeout to refresh the token a minute before it expires
//     const expires = new Date(jwtToken.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - (60 * 1000);
//     refreshTokenTimeout = setTimeout(refreshToken, timeout);
// }

// function stopRefreshTokenTimer() {
//     clearTimeout(refreshTokenTimeout);
// }
