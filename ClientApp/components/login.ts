import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import LoginCreds from '../types/LoginCreds';
import UserInfo from '../types/UserInfo';
import VueCoreService from '../services/VueCoreService';
import axios from 'axios';

@Component
export default class LoginComponent extends Vue {
    loginData: LoginCreds = {
        username: '',
        password: ''
    };

    doLogin() {
        this.$store.dispatch('login', this.loginData);

    }

    doLogout() {
        this.$store.dispatch('logout');
    }

    get connectedUser() {
        return this.$store.state.user ? this.$store.state.user.name : '';
    }
}
