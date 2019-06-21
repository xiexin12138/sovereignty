import mail_api from '@/api/mail'

const state = {
  outMailList: []
  //
}

const getters = {
  get_out_mail_list: (state) => {
    return state.outMailList
  }
}

const actions = {
  async updateOutMailList ({ commit, state }, username) {
    let mail_list
    await mail_api.inbox_mail(username, '').then(response => {
      if (response.data != undefined) {
        mail_list = response.data
      }
    }).catch(error => {})
    let tempList = []
    if (typeof (mail_list) === 'string') {
      mail_list = mail_list.split('\n')
      for (let temp of mail_list) {
        if (temp.split(',')[2] == username) {
          tempList.push({
            id: temp.split(',')[0],
            recipent: temp.split(',')[1],
            sender: temp.split(',')[2],
            content: temp.split(',')[3]
          })
        }
      }
    }
    commit('setOutMailList', tempList)
  }
}

const mutations = {
  setOutMailList (state, mailList) {
    state.outMailList = mailList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
