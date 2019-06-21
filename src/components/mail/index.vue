<template>
<el-container style="height: 100%; border: 1px solid #eee;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect" @close="handleClose">
      <el-menu-item index="0">
        <i class="el-icon-back"></i>
        <span slot="title">返回首页</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-box"></i>
        <span slot="title">收件箱</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-message"></i>
        <span slot="title">发件箱</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container v-loading="maillist_loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-header style="text-align: left;">
      <el-button type="primary" size="mini" icon="el-icon-edit" style="margin-top:15px" @click="newMail">写邮件</el-button>
      <el-button type="primary" size="mini" icon="el-icon-postcard" style="margin-top:15px" @click="getMails" :loading="getMailBtnLoding">{{getMailBtn}}</el-button>
    </el-header>
    <el-main>
      <el-table :data="maillist" @row-click="maillist_row_click">
        <el-table-column prop="id" label="编号" width="120">
        </el-table-column>
        <el-table-column prop="sender" label="发件人">
        </el-table-column>
        <el-table-column prop="recipent" label="收件人">
        </el-table-column>
        <el-table-column prop="content" label="内容" :show-overflow-tooltip='true'>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <el-dialog title="新邮件" :visible.sync="dialogVisible" width="60%" style="height:100%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="发件人">
        <el-input style="width: 50%;" v-model="getUsername" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="收件地址" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]">
        <el-input style="width: 50%;" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" style="width: 90%;" :rows="8" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sendmail('form')">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog :title="'来自：'+dialog_content.sender" :visible.sync="dialogVisible_content" width="60%" style="height:100%" :before-close="handleClose_content">
    <el-container>
      <el-row>
        <el-col :span="24">
          <div style="font-size:16px;padding:5px">
            <strong>邮件编号：</strong>{{this.dialog_content.id}}
          </div>
          <div style="font-size:16px;padding:5px">
            <strong>收件人：</strong>{{this.dialog_content.recipent}}
          </div>
        </el-col>
        <el-col :span="24" style="padding:10px">
          {{this.dialog_content.content}}
        </el-col>
      </el-row>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible_content = false">关 闭</el-button>
    </span>
  </el-dialog>

</el-container>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import {
  Notification,
  Message,
  MessageBox
} from 'element-ui';
import mail_api from '@/api/mail'

export default {
  computed: {
    get_in_mail_list() {
      return this.$store.getters.get_in_mail_list
    },
    get_out_mail_list() {
      return this.$store.getters.get_out_mail_list
    },
    getUsername() {
      return this.$store.getters.getUsername
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible_content: false,
      form: {
        content: '',
        address: 'misiyu@b.com'
      },
      maillist: [],
      current_box: null,
      dialog_content: {
        sender: '',
        id: '',
        recipent: '',
        content: ''
      },
      maillist_loading: false,
      getMailBtn: '收取邮件',
      getMailBtnLoding: false
    };
  },
  mounted() {
    this.maillist_loading = true
    this.getMailBtnLoding = false
    const that = this
    mail_api.inbox_mail(this.getUsername, '').then(response => {
      if (response.data != undefined) {
        that.$store.dispatch('updateInMailList', that.$store.getters.getUsername)
        that.maillist = that.get_in_mail_list
        that.maillist_loading = false
        that.current_box = 1
      }
    }).catch(error => {
      Message.error({
        title: '失败',
        message: error
      })
      this.loginBtn = '登 录'
      this.loginLoding = false
    });
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 写邮件
    newMail() {
      this.dialogVisible = true
    },
    handleSelect(key, keyPath) {
      // 0为跳回首页
      if (key == 0) {
        this.$router.push('/')
        this.current_box = null
        // 1为收件箱
      } else if (key == 1) {
        this.$store.dispatch('updateInMailList', this.$store.getters.getUsername)
        setTimeout(1000)
        this.maillist = this.$store.getters.get_in_mail_list
        this.current_box = 1
        // 2为发件箱
      } else if (key == 2) {
        this.$store.dispatch('updateOutMailList', this.$store.getters.getUsername)
        setTimeout(1000)
        this.maillist = this.$store.getters.get_out_mail_list
        this.current_box = 2
      }
    },
    // 点击查看具体行信息
    maillist_row_click(row) {
      this.dialogVisible_content = true
      this.dialog_content.content = row.content
      this.dialog_content.sender = row.sender
      this.dialog_content.id = row.id
      this.dialog_content.recipent = row.recipent
    },
    handleClose_content(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 收取邮件
    getMails() {
      this.getMailBtnLoding = true
      this.getMailBtn = '收取中...'
      if (this.current_box == 1) {
        this.$store.dispatch('updateInMailList', this.$store.getters.getUsername)
        this.maillist = this.$store.getters.get_in_mail_list
      } else if (this.current_box == 2) {
        this.$store.dispatch('updateOutMailList', this.$store.getters.getUsername)
        this.maillist = this.$store.getters.get_out_mail_list
      }
      // TODO: 当前版本默认收取成功，没有对收取结果做判断
      setTimeout(() => {
        Message.success({
          showClose: true,
          message: '收取成功！'
        })
        this.getMailBtnLoding = false
        this.getMailBtn = '收取邮件'
      }, 5000)
    },
    // 发送邮件
    sendmail(formName) {
      let that = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await mail_api.sendmail(that.form.address, that.getUsername, that.form.content).then(data => {
            Message.success({
              showClose: true,
              message: '邮件发送成功！'
            })
            // 重置发件箱的输入内容
            that.form.content = ''
            that.dialogVisible = false
          }).catch(error => {
            Message.error({
              showClose: true,
              message: '邮件发送失败！请联系管理员！'
            })
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style>
</style>
