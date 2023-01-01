import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// let BaseUrl = `https://vue3-course-api.hexschool.io/`
createApp(App)
.use(router)
.use(VueAxios, axios)
.use(VueSweetalert2)
.mount('#app')
