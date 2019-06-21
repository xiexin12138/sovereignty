import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import inbox from './modules/inbox'
import outbox from './modules/outbox'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    inbox,
    outbox,
    user,
  },
  // 使用插件将数据临时保存在本地，防止页面刷新导致vuex被清空
  plugins: [createPersistedState({
      storage: window.sessionStorage
  })]
})
