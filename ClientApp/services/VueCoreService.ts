import axios from 'axios';
import LoginCreds from '../types/LoginCreds';

const apiClient = axios.create({
    baseURL: `http://localhost:5000`,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
export default {
    login(creds: LoginCreds) {
        return apiClient.post('/api/account/login', creds);
    },
    logout() {
        return apiClient.post('/api/account/logout');
    },
    getUser() {
        return apiClient.get('api/account/user');
    }

}