import axios from 'axios';
import LoginCreds from '../types/LoginCreds';

const apiClient = axios.create({
    baseURL: `http://localhost:5000`,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
export default {
    login(creds: LoginCreds) {
        return apiClient.post('/api/account/login', creds);
    }

}