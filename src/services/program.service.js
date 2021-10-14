import { BehaviorSubject } from 'rxjs';

import config from '../config';
import { fetchWrapper, history } from '../helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/program`;

export const programService = {  
    create,
    update,  
    getById,
    getAll,  
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function _delete(id) {    
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {            
            // auto logout if the logged in user deleted their own record
            /* if (id === userSubject.value.id) {
                logout();
            } */
            console.log("x == ",x);
            return x;
        });
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
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

let refreshTokenTimeout;
