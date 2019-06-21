import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '@/components/mainPage'
import MailPage from '@/components/mail'
import LoginPage from '@/components/mail/login'

const router = new Router({
  mode: 'history', // 设置为history才不会在地址中带#影响跳转
  routes: [{
    path: '/', // 首页
    component: IndexPage
  }, {
    path: '/login', // 邮箱登录页
    component: LoginPage
  }, {
    path: '/mail', // 邮箱页
    component: MailPage
  }]
})

Vue.use(Router)

export default router
