import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

@Component({
    components: {
        MenuComponent: require('../navmenu/navmenu.vue.html')
    }
})
export default class AppComponent extends Vue {
}
