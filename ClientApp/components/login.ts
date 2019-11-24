import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import LoginCreds from '../types/LoginCreds';
import VueCoreService from '../services/VueCoreService';
import axios from 'axios';

@Component
export default class LoginComponent extends Vue {
    loginData: LoginCreds = {
        username: '',
        password: ''
    };

    doLogin() {
        
        VueCoreService.login(this.loginData)
            .then((res) => {
                alert('authorized: ' + JSON.stringify(res.data))
            }).catch((e: string) => {
                alert('unauthorized');
                console.error(e);
            });

    }
}
