import './assets/main.sass';
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import router from './router/index';

import snackbarPlugin from '@/plugins/snackbarPlugin';

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(createPinia());
app.use(snackbarPlugin);
app.use(router);

app.mount('#app');
