import { MutationTree } from 'vuex'
import UserInfo from '../types/UserInfo'

const mutations: MutationTree<any> = {
    SET_USER_DATA(state, userData: UserInfo): void {
        console.log('mutations: commiting ' + userData.name);
        state.user = userData
    },
    LOGOUT(state): void {
        console.log('mutations/logout: committing');
        state.user = null;
    }
}
export default mutations