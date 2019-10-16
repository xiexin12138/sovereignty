import qs from 'qs'
import Vue from '@/main'

export default {
  // 邮箱用户登录
  async maillogin(username, psw) {
    // return await Vue.$axios.post('http://121.15.171.84/mclient/ndn_email/get_e_list.php', qs.stringify({
    return await Vue.$axios.post('http://192.168.42.142:8090/mclient/ndn_email/get_e_list.php', qs.stringify({
      // return await Vue.$axios.post(process.env.API_HOST + '/mclient/ndn_email/get_e_list.php', qs.stringify({
      e_addr: username, // 用户名
      key: psw // 密码
    }))
  },

  // 获取收件箱邮件
  async inbox_mail(username, psw) {
    return await Vue.$axios.post('http://192.168.42.142:8090/mclient/ndn_email/get_e_list.php', qs.stringify({
      // return await Vue.$axios.post('http://121.15.171.84/mclient/ndn_email/get_e_list.php', qs.stringify({
      // return await Vue.$axios.post(process.env.API_HOST + '/mclient/ndn_email/get_e_list.php', qs.stringify({
      e_addr: username, // 用户名
      key: psw // 密码
    }))
  },

  // 获取发件箱邮件
  async sendmail(target, sender, msg) {
    return await Vue.$axios.post('http://192.168.42.142:8090/mclient/ndn_email/send_email.php', qs.stringify({
      // return await Vue.$axios.post('http://121.15.171.84/mclient/ndn_email/send_email.php', qs.stringify({
      // return await Vue.$axios.post(process.env.API_HOST + '/mclient/ndn_email/send_email.php', qs.stringify({
      d_addr: target, // 目的地址
      s_addr: sender, // 发件人地址
      msg: msg // 发件内容
    }))
  }
}