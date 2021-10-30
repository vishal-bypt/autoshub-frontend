import { BehaviorSubject } from 'rxjs';
import config from '../config';


const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/revenue`;

export const revenueService = {
    uploadRevenueExcel,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value }
};


function uploadRevenueExcel(params) {
    return fetch(`${baseUrl}/uploadRevenueExcel`,
        {
            body: params,
            method: "post"
        }).then(response => response.json());
}
