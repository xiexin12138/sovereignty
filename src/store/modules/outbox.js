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
    // 调用接口从后端请求发件箱邮件
    await mail_api.inbox_mail(username, '').then(response => {
      if (response.data != undefined) {
        mail_list = response.data
      }
    }).catch(error => {})
    let tempList = []
    if (typeof (mail_list) === 'string') {
      // 每行为一封邮件
      mail_list = mail_list.split('\n')
      for (let temp of mail_list) {
        // 当发件人用户名和当前登录用户一致时，保存
        if (temp.split(',')[2] == username) {
          tempList.push({
            id: temp.split(',')[0], // 邮件id
            recipent: temp.split(',')[1], // 接收者地址
            sender: temp.split(',')[2], // 发送者地址
            content: temp.split(',')[3] // 邮件内容
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
