import { BehaviorSubject } from 'rxjs';
import config from '../config';
import { fetchWrapper } from '../helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;
const baseUrl2 = `${config.apiUrl}`;
const baseUrlTraining = `${config.apiUrl}/training`;

export const dashboardService = {
  getTrainingPartnerAssigned,
  getTrainingPartnerAttended,
  getTrainingPartnerAssignedAttended,
  getEmployeedWiseNominated,
  getEmployeedWiseAttended,
  getNominatedAcceptedRejected,
  getEmployeedWiseAssigned,
  exportAnyReport,
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

function getTrainingPartnerAssigned(startDate="", endDate="", execManager="", manager=[]) {
    
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    //return fetchWrapper.get(`${baseUrl}`);
    return fetchWrapper.get(`${baseUrlTraining}/getTrainingPartnerAssigned?startDate=${startDate}&endDate=${endDate}&execManager=${execManager}&manager=${manager.map(x => "'" + x + "'").toString()}`);
      // return Promise.all([
      //   { value: 200, name: "UiPaths" },
      //   { value: 45, name: "BluePrism" },
      //   { value: 31, name: "Google Cloud" },
      //   { value: 15, name: "AWS" },
      //   { value: 20, name: "Automation" },
      // ]);
}

function getTrainingPartnerAttended(startDate="", endDate="", execManager="", manager=[]) {
    // return fetchWrapper.get(`${baseUrl}`);
      return fetchWrapper.get(`${baseUrlTraining}/getTrainingPartnerAttended?startDate=${startDate}&endDate=${endDate}&execManager=${execManager}&manager=${manager.map(x => "'" + x + "'").toString()}`);
      // return Promise.all([
      //   { value: 200, name: "UiPaths" },
      //   { value: 45, name: "BluePrism" },
      //   { value: 31, name: "Google Cloud" },
      //   { value: 15, name: "AWS" },
      //   { value: 20, name: "Automation" },
      // ]);
}

function getTrainingPartnerAssignedAttended(startDate="", endDate="", execManager="", manager=[]) {
    // return fetchWrapper.get(`${baseUrl}`);
      return fetchWrapper.get(`${baseUrlTraining}/getTrainingPartnerAssignedAttended?startDate=${startDate}&endDate=${endDate}&execManager=${execManager}&manager=${manager.map(x => "'" + x + "'").toString()}`);
      return Promise.all([
        { value: 135, name: "Assigned" },
        { value: 65, name: "Attended" },
      ]);
}

function getEmployeedWiseNominated(startDate="", endDate="", execManager="", manager=[]) {
    // return fetchWrapper.get(`${baseUrl}`);
      return fetchWrapper.get(`${baseUrlTraining}/getTrainingPartnerNominated?startDate=${startDate}&endDate=${endDate}&execManager=${execManager}&manager=${manager.map(x => "'" + x + "'").toString()}`);
      // return Promise.all([
      //   { value: 200, name: "UiPaths" },
      //   { value: 45, name: "BluePrism" },
      //   { value: 31, name: "Google Cloud" },
      //   { value: 15, name: "AWS" },
      //   { value: 20, name: "Automation" },
      // ]);
}

function getEmployeedWiseAttended(startDate="", endDate="", execManager="", manager=[]) {
    // return fetchWrapper.get(`${baseUrl}`);
      return fetchWrapper.get(`${baseUrlTraining}/getTrainingPartnerAssigned?startDate=${startDate}&endDate=${endDate}&execManager=${execManager}&manager=${manager.map(x => "'" + x + "'").toString()}`);
      // return Promise.all([
      //   { value: 200, name: "UiPaths" },
      //   { value: 45, name: "BluePrism" },
      //   { value: 31, name: "Google Cloud" },
      //   { value: 15, name: "AWS" },
      //   { value: 20, name: "Automation" },
      // ]);
}

function getNominatedAcceptedRejected(startDate="", endDate="", execManager="", manager=[]) {
    // return fetchWrapper.get(`${baseUrl}`);
     return fetchWrapper.get(`${baseUrlTraining}/getNominatedAcceptedRejected?startDate=${startDate}&endDate=${endDate}&execManager=${execManager}&manager=${manager.map(x => "'" + x + "'").toString()}`);
      // return Promise.all([
      //   { value: response['nominated'], name: response['category'] },
      //   { value: response['accepted'], name: response['category'] },
      //   { value: response['rejected'], name: response['category'] },
      // ]);
      // return Promise.all([
      //   { value: 335, name: "Nominated" },
      //   { value: 310, name: "Accepted" },
      //   { value: 234, name: "Rejected" },
      // ]);
}


function getEmployeedWiseAssigned(startDate="", endDate="", execManager="", manager=[]) {
    // return fetchWrapper.get(`${baseUrl}`);
    //return fetchWrapper.get(`${baseUrl}/?limit=${limit}&offset=${offset}&filter=${searchValue}`);
    return fetchWrapper.get(`${baseUrlTraining}/getTrainingPartnerAssigned?startDate=${startDate}&endDate=${endDate}&execManager=${execManager}&manager=${manager.map(x => "'" + x + "'").toString()}`);  
    // return Promise.all([
    //     { value: 200, name: "UiPaths" },
    //     { value: 45, name: "BluePrism" },
    //     { value: 31, name: "Google Cloud" },
    //     { value: 15, name: "AWS" },
    //     { value: 20, name: "Automation" },
    //   ]);
}


function exportAnyReport(reportName, reportData, reportKeys) {
    
  //return fetchWrapper.get(`${baseUrl}`);
  return fetchWrapper.post(`${baseUrlTraining}/exportAnyReport`, {'reportName' : reportName, 'reportData' : reportData, 'reportKeys' : reportKeys});
    
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


