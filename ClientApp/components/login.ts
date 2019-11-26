import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import LoginCreds from '../types/LoginCreds';
import UserInfo from '../types/UserInfo';
import VueCoreService from '../services/VueCoreService';
import { validationMixin } from 'vuelidate';
import { Validation } from "vuelidate";
import { required, minLength, email, ValidationRule } from 'vuelidate/lib/validators'
import "./registerComponentHooks"


@Component({
    components: {
        Example: require('./Example.vue'),
        
    }
})
export default class LoginComponent extends Vue {
    loginData: LoginCreds = {
        username: '',
        password: ''
    };
    errorMessage: string = '';

    isLoading: boolean = false;

    doLogin() {
        // problem: cannot access $v.

        this.isLoading = true;
        var thislogin = this;
        setTimeout(function () {
            thislogin.$store.dispatch('login', this.loginData);
            thislogin.isLoading = false;
        }, 3000);
    }

    doLogout() {
        this.$store.dispatch('logout');
    }

    get connectedUser() {
        return this.$store.state.user ? this.$store.state.user.name : '';
    }

    validations() {
        return {
            loginData: {
                username: { required, minLength: minLength(6) }
            }
        }
    }
}
