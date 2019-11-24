import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import LoginCreds from '../types/LoginCreds';
import UserInfo from '../types/UserInfo';
import VueCoreService from '../services/VueCoreService';
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: mutations,
    actions: actions
})
