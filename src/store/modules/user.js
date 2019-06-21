const state = {
  username: ''
}

const getters = {
  getUsername: state => {
    return state.username
  }
}

const actions = {
  updateUsername ({ commit, state }, username) {
    commit('setUsername', username)
  }
}

const mutations = {
  setUsername (state, username) {
    state.username = username
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
