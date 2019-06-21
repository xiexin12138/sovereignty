// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-theme-chalk';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import router from './router'
import axios from 'axios'
import store from './store'

//设置请求头
axios.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded"

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
