import { ActionTree } from 'vuex';
import axios from 'axios';
import VueCoreService from '../services/VueCoreService';
import LoginCreds from '../types/LoginCreds'

const actions: ActionTree<any, any> = {

    login({ commit }, credentials: LoginCreds) {
        console.log('actions: login');
        VueCoreService.login(credentials)
            .then((res) => {
                console.log('actions: login 200');
                commit('SET_USER_DATA', res.data);
            }).catch((e) => {
                console.log('actions: login error');
                console.error(e.response as string);
            });
    },
    logout({ commit }) {
        commit('LOGOUT')
    }

}

export default actions