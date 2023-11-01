import './assets/main.css'
import { Field, Form, ErrorMessage } from 'vee-validate';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);


app.use(router).mount('#app');
