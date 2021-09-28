import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createStore } from 'vuex'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import VueApexCharts from "vue3-apexcharts";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Dropdown from 'primevue/dropdown';
import Menubar from 'primevue/menubar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Avatar from 'primevue/avatar';
import Steps from 'primevue/steps';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import MultiSelect from 'primevue/multiselect';
import ProgressBar from 'primevue/progressbar';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Tooltip from 'primevue/tooltip';
import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


const store = createStore({
    state() {
        return {
            loggedUser: null,
            token: null
        };
    },
    mutations: {
        setLoggedUser(state, user_id) {
            state.loggedUser = user_id;
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    getters: {
        getLoggedUser(state) {
            return state.loggedUser;
        },
        getToken(state) {
            return state.token;
        }
    }
})
const instance = axios.create({
    // baseURL: process.env.NODE_ENV == 'development' ? '' : ''
    baseURL: 'http://localhost:8081',
    timeout: 60 * 4 * 1000
});
const app = createApp(App)
app.use(PrimeVue);
app.component("InputText", InputText);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Dropdown", Dropdown);
app.component("Menubar", Menubar);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Card", Card);
app.component("Carousel", Carousel);
app.component("Menubar", Menubar);
app.component("Avatar", Avatar);
app.component("Steps", Steps);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("ProgressBar", ProgressBar);
app.component("MultiSelect", MultiSelect);
app.component('Password', Password);
app.component('Divider', Divider);
app.component('Dialog', Dialog);
app.directive('tooltip', Tooltip);
app.use(VueApexCharts);
app.use(store)
app.use(router)
app.use(ToastService);
app.use(BootstrapIconsPlugin);
app.use(VueAxios, axios)
app.config.globalProperties.$axios = instance;
app.mount('#app')

