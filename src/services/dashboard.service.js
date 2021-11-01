import { BehaviorSubject } from 'rxjs';

import config from '../config';
import { fetchWrapper, history } from '../helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;
const baseUrl2 = `${config.apiUrl}`;


export const dashboardService = {
    getTrainingPartnerAssigned,
    getTrainingPartnerAttended,
    getTrainingPartnerAssignedAttended,
    getEmployeedWiseNominated,
    getEmployeedWiseAttended,
    getNominatedAcceptedRejected,
    getEmployeedWiseAssigned,
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

function getTrainingPartnerAssigned(startDate, endDate) {
    
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    //return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
      return Promise.all([
        { value: 200, name: "UiPaths" },
        { value: 45, name: "BluePrism" },
        { value: 31, name: "Google Cloud" },
        { value: 15, name: "AWS" },
        { value: 20, name: "Automation" },
      ]);
}

function getTrainingPartnerAttended(startDate, endDate) {
    // return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
      return Promise.all([
        { value: 200, name: "UiPaths" },
        { value: 45, name: "BluePrism" },
        { value: 31, name: "Google Cloud" },
        { value: 15, name: "AWS" },
        { value: 20, name: "Automation" },
      ]);
}

function getTrainingPartnerAssignedAttended(startDate, endDate) {
    // return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
      return Promise.all([
        { value: 135, name: "Assigned" },
        { value: 65, name: "Attended" },
      ]);
}

function getEmployeedWiseNominated(startDate, endDate) {
    // return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
      return Promise.all([
        { value: 200, name: "UiPaths" },
        { value: 45, name: "BluePrism" },
        { value: 31, name: "Google Cloud" },
        { value: 15, name: "AWS" },
        { value: 20, name: "Automation" },
      ]);
}

function getEmployeedWiseAttended(startDate, endDate) {
    // return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
      return Promise.all([
        { value: 200, name: "UiPaths" },
        { value: 45, name: "BluePrism" },
        { value: 31, name: "Google Cloud" },
        { value: 15, name: "AWS" },
        { value: 20, name: "Automation" },
      ]);
}

function getNominatedAcceptedRejected(startDate, endDate) {
    // return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
      return Promise.all([
        { value: 335, name: "Nominated" },
        { value: 310, name: "Accepted" },
        { value: 234, name: "Rejected" },
      ]);
}


function getEmployeedWiseAssigned(startDate, endDate) {
    // return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
      return Promise.all([
        { value: 200, name: "UiPaths" },
        { value: 45, name: "BluePrism" },
        { value: 31, name: "Google Cloud" },
        { value: 15, name: "AWS" },
        { value: 20, name: "Automation" },
      ]);
}


function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(user => {
            console.log("user", user);
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
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


