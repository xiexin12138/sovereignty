import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '@/components/mainPage'
import MailPage from '@/components/mail'
import LoginPage from '@/components/mail/login'
import ReleasePage from '@/components/release'


const router = new Router({
  mode: 'history',
  routes: [{
    /*首页*/
    path: '/',
    component: IndexPage
  }, {
    // 发布
    path: '/release',
    component: ReleasePage
  }, {
    // 发布
    path: '/login',
    component: LoginPage
  }, { /*首页*/
    path: '/mail',
    component: MailPage
  }]
})

Vue.use(Router);

export default router
