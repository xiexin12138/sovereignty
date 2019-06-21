import qs from 'qs'
import Vue from '@/main'

export default {
  async maillogin (username, psw) {
    return await Vue.$axios.post(process.env.API_HOST + '/mclient/ndn_email/get_e_list.php', qs.stringify({
      e_addr: username,
      key: psw
    }))
  },

  async inbox_mail (username, psw) {
    return await Vue.$axios.post(process.env.API_HOST + '/mclient/ndn_email/get_e_list.php', qs.stringify({
      e_addr: username,
      key: psw
    }))
  },

  async sendmail (target, sender, msg) {
    return await Vue.$axios.post(process.env.API_HOST + '/mclient/ndn_email/send_email.php', qs.stringify({
      d_addr: target,
      s_addr: sender,
      msg: msg
    }))
  }
}
