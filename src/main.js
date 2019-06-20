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

//设置请求头
axios.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded"
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
