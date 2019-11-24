import { ActionTree } from 'vuex';
import axios from 'axios';
import VueCoreService from '../services/VueCoreService';
import LoginCreds from '../types/LoginCreds'

const actions: ActionTree<any, any> = {

    login({ commit }, credentials: LoginCreds) {
        console.log('actions: login');
        VueCoreService.login(credentials)
            .then((res) => {
                console.log('actions/login commit');
                commit('SET_USER_DATA', res.data);
            }).catch((e) => {
                console.error('actions/login error: ' + e.response as string);
            });
    },
    logout({ commit }) {
        VueCoreService.logout()
            .then((res) => {
                console.log('actions/logout commit');
                commit('LOGOUT');
            }).catch((e) => {
                commit('LOGOUT');
                console.error('actions/logout error: ' + e.response as string);
            })
    },
    getUser({ commit, dispatch }) {
        VueCoreService.getUser()
            .then((res) => {
                console.log('actions/getUser commit');
                commit('SET_USER_DATA', res.data);
            }).catch((e) => {
                if (e.response.status == 401)
                    dispatch('logout');
                console.error('actions/getUser error: ' + e.response as string);
            })
    }

}

export default actions