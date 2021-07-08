import Vue from 'vue';
import App from '../App.vue';
import { createRouter } from '../route';
import VueMeta from 'vue-meta';

Vue.config.productionTip = false;

Vue.use(VueMeta);

const router = createRouter(); //创建路由

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#root', true);
