<template>
<el-container id='app' style="height:100%;background-color:#ffffff;margin:0">
  <!-- 页头 -->
  <el-header style="height:30%;  display: flex;  align-items: center;">
    <el-row class="hidden-xl-only" style="margin-left:60px;font-size:40px;width:400px;text-align:left;color:#000000; font-family:'Microsoft YaHei';border-bottom:2px solid #000000;">
       MIN
    </el-row>
    <el-row class="hidden-lg-and-down" style="margin-left:60px;font-size:60px;width:500px;text-align:left;color:#000000; font-family:'Microsoft YaHei';border-bottom:2px solid #000000;">
       MIN
    </el-row>
  </el-header>
  <!-- 页面主体 -->
  <el-main>
    <el-row :gutter="40" type="flex" justify="center" style="height:100%">
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{ padding: '0px', 'text-align': 'center', 'border-radius':'0px', 'background-color':'#409EFF'}">
          <el-image :src="require('@/assets/edit.png')">
          </el-image>
          <div>
            <div class="bottom clearfix">
              <el-dropdown style="width:100%" @command="changeDialogVisiable">
                <el-button type="primary" style="font-size:20px;width:100%;border-radius:0px;border:0px">
                  发 布 管 理
                </el-button>
                <el-dropdown-menu slot="dropdown" style="width:14%">
                  <el-dropdown-item command="release">资源发布</el-dropdown-item>
                  <el-dropdown-item command="register">资源发布用户注册</el-dropdown-item>
                  <el-dropdown-item command="old">返回旧版</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{ padding: '0px', 'text-align':'center', 'background-color':'#909399' }">
          <el-image :src="require('@/assets/opportunity.png')">
          </el-image>
          <div>
            <div class="bottom clearfix ">
              <el-dropdown style="width:100%" @command="changeDialogVisiable">
                <el-button type="info" style="font-size:20px;width:100%;border-radius:0px;border:0px">
                  浏 览 管 理
                </el-button>
                <el-dropdown-menu slot="dropdown" style="width:14%">
                  <el-dropdown-item command="goToBrowse">资源浏览</el-dropdown-item>
                  <el-dropdown-item command="registerBrowser">浏览用户注册</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- <el-button type='info' @click="goToBrowse" style="font-size:20px;width:100%;border-radius:0px;border:1px; border-color:#409EFF" class="button">浏 览</el-button> -->
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{ padding: '0px', 'text-align': 'center', 'background-color':'#E6A23C'  }">
          <el-image :src="require('@/assets/message.png')">
          </el-image>
          <div>
            <div class="bottom clearfix">
              <el-button type='warning' @click="goToMail" style="font-size:20px;width:100%;border-radius:0px;border:1px; border-color:#EBEEF5" class="button">邮 件</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" :body-style="{ padding: '0px', 'text-align': 'center', 'background-color':'#67C23A' }">
          <el-image :src="require('@/assets/chat.png')">
          </el-image>
          <div>
            <div class="bottom clearfix">
              <el-button type='success' @click="developing" style="font-size:20px;width:100%;border-radius:0px;border:1px; border-color:#EBEEF5" class="button">聊 天</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
  <!-- 页脚 -->
  <el-footer style="text-align:center;color:#000000">@北京大学深圳研究生院 未来网络北大实验室</el-footer>
  <!--======================= 以下是本页的Dialog =======================-->
  <!-- 资源发布Dialog -->
  <el-dialog title="资源发布" :visible.sync="releaseDialogVisiable" width="30%" :before-close="handleClose_Dialog">
    <el-row style="text-align:left;color:#000000;">
      <el-form label-position="top" ref="releaseFrom" :model="releaseFrom" label-width="100px">
        <el-form-item label="资源标识">
          <el-input v-model="releaseFrom.flag" clearable></el-input>
        </el-form-item>
        <el-form-item label="映射地址">
          <el-input v-model="releaseFrom.mapAddr" clearable></el-input>
        </el-form-item>
        <el-form-item label="资源哈希码/资源本地路径">
          <el-input v-model="releaseFrom.hashAndLocation" clearable></el-input>
        </el-form-item>
        <el-form-item label="资源描述">
          <el-input v-model="releaseFrom.description" clearable></el-input>
        </el-form-item>
        <el-form-item label="密钥路径">
          <el-input v-model="releaseFrom.secretKeyLocation" clearable></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="releaseResource" style="width:100%">开始身份认证</el-button>
    </span>
    <el-dialog id='testDialog' width="30%" title="请使用APP扫描进行身份认证" :visible.sync="releaseDialogVisiable_innerVisible" :append-to-body='true'>
      <img :src="qrc_addr" style="width: 100%;display: block;">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="releaseResource" style="width:100%">发 布</el-button>
      </span>
    </el-dialog>
  </el-dialog>
  <!--======================= 资源发布用户注册Dialog =======================-->
  <el-dialog title="资源发布用户注册" status-icon :visible.sync="registerDialogVisiable" width="30%" :before-close="handleClose_Dialog">
    <el-row style="text-align:left;color:#000000;">
      <el-form label-position="top" ref="registerFrom" :model="registerFrom" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="registerFrom.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="registerFrom.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="registerFrom.realName" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="registerFrom.IDCard" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="registerFrom.description" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="申请前缀" prop="prefix_rule"> -->
        <el-form-item label="申请前缀">
          <el-input v-model="registerFrom.prefix" clearable></el-input>
        </el-form-item>
        <el-form-item label="密钥路径">
          <el-input v-model="registerFrom.secretKeyLocation" clearable></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="registerUser('registerFrom')" style="width:100%">开始身份认证</el-button>
    </span>
    <el-dialog width="30%" title="请使用APP扫描进行身份认证" :visible.sync="registerDialogVisiable_innerVisible" append-to-body>
      <img :src="qrc_addr" style="width: 100%;display: block;">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog('register_inner')" style="width:100%">完成注册</el-button>
        <!-- <el-button type="primary" @click="registerUser('registerFrom')" style="width:100%">注 册</el-button> -->
      </span>
    </el-dialog>
  </el-dialog>

  <!--======================= 资源浏览用户注册Dialog =======================-->
  <el-dialog title="资源浏览用户注册" status-icon :visible.sync="registerBrowserDialogVisiable" width="30%" :before-close="handleClose_Dialog">
    <el-row style="text-align:left;color:#000000;">
      <el-form label-position="top" ref="registerBrowserFrom" :model="registerBrowserFrom" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="registerBrowserFrom.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在群">
          <el-input v-model="registerBrowserFrom.group" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="registerBrowserFrom.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="registerBrowserFrom.realName" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="registerBrowserFrom.IDCard" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="registerBrowserFrom.description" clearable></el-input>
        </el-form-item>
        <el-form-item label="密钥路径">
          <el-input v-model="registerBrowserFrom.secretKeyLocation" clearable></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="getCertificate('registerBrowserFrom')" style="width:100%">生成证书</el-button>
    </span>
  </el-dialog>
</el-container>
</template>

<script>
import {
  Notification,
  Message,
  MessageBox
} from 'element-ui'
import qs from 'qs'

export default {
  data () {
    let checkPrefix = (rule, value, callback) => {
      console.log('value:' + value)
      if (!value) {
        return callback(new Error('前缀不能为空'))
      }
      setTimeout(() => {
        if (value[0] != '/') {
          callback(new Error('请正确填写前缀名'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      dialogVisiable: '', // 保存下拉框中要打开的dialog对象的command，传递到方法中去判断要设置哪个dialog的可见性为true
      releaseDialogVisiable: false, // 发布资源dialog可见性
      registerDialogVisiable: false, // 用户注册dialog可见性
      registerBrowserDialogVisiable: false, // 浏览用户注册dialog可见性
      releaseDialogVisiable_innerVisible: false,
      registerDialogVisiable_innerVisible: false,
      qrc_addr: process.env.API_HOST + '/mclient/keystore/tdc.png',
      releaseFrom: {
        flag: '',
        mapAddr: '',
        hashAndLocation: '',
        description: '',
        secretKeyLocation: ''
      },
      registerFrom: {
        name: ' ',
        phone: '',
        realName: '',
        IDCard: '',
        description: '',
        prefix: '',
        secretKeyLocation: ''
      },
      registerBrowserFrom: {
        name: ' ',
        phone: '',
        realName: '',
        IDCard: '',
        description: '',
        group: '',
        secretKeyLocation: ''
      },
      rules: {
        prefix_rule: [{
          validator: checkPrefix,
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {},
  methods: {
    // 跳转到邮箱登录页
    goToMail () {
      this.$router.push('/login')
    },
    // 根据选择的按钮，显示对应的Dialog
    changeDialogVisiable (command) {
      if (command == 'release') {
        // 显示资源发布Dialog
        this.releaseDialogVisiable = true
      } else if (command == 'register') {
        // 显示资源发布用户注册Dialog
        this.registerDialogVisiable = true
      } else if (command == 'old') {
        // 跳转到旧版本
        window.location.href = process.env.API_HOST + '/mclient/register.html'
      } else if (command == 'goToBrowse') {
        // 跳转到资源浏览页
        window.location.href = process.env.API_HOST + '/mclient/more_n.php'
      } else if (command == 'registerBrowser') {
        this.registerBrowserDialogVisiable = true
      }
    },
    handleClose_Dialog (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 根据返回的Dialog名称关闭对应的Dialog，并做对应回收工作
    closeDialog (dialogName) {
      if (dialogName == 'release') {
        this.releaseDialogVisiable = false
      } else if (dialogName == 'register') {
        this.registerDialogVisiable = false
      } else if (dialogName == 'release_inner') {
        this.releaseDialogVisiable_innerVisible = false
      } else if (dialogName == 'register_inner') {
        this.registerDialogVisiable = false
        this.registerDialogVisiable_innerVisible = false
      } else if (dialogName == 'registerBrowser') {
        this.registerBrowserDialogVisiable = false
      }
      this.dialogVisiable = ''
    },
    developing () {
      Message.info({
        showClose: true,
        message: '该功能正在开发中，敬请期待'
      })
    },
    // 资源发布
    releaseResource () {
      let that = this
      this.$axios.post(process.env.API_HOST + '/mclient/create_url.php', qs.stringify({
        input1: this.releaseFrom.flag,
        input2: this.releaseFrom.mapAddr,
        input3: this.releaseFrom.hashAndLocation,
        input4: this.releaseFrom.secretKeyLocation,
        input5: this.releaseFrom.description
      })).then(function (response) {
        if (response.data[0] == '0') {
          that.releaseDialogVisiable_innerVisible = true
          // Message.s
        } else {
          that.closeDialog('release_inner')
          that.closeDialog('release')
          Message.info({
            title: '消息',
            message: response.data
          })
        }
      }).catch(function (error) {
        console.log('error', error)
        Notification.error({
          title: '错误',
          message: '请求错误，请联系管理员查看问题'
        })
      })
    },
    // 资源发布用户注册
    registerUser (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(process.env.API_HOST + '/mclient/register.php', qs.stringify({
            input1: this.registerFrom.name,
            input2: this.registerFrom.phone,
            input3: this.registerFrom.prefix,
            input4: this.registerFrom.secretKeyLocation,
            input5: this.registerFrom.realName,
            input6: this.registerFrom.IDCard,
            input7: this.registerFrom.description
          })).then(function (response) {
            that.registerDialogVisiable_innerVisible = true
            if (response.data[0] == 'o') {
              Message.success({
                title: '提示',
                message: response.data
              })
            }
          }).catch(function (error) {
            Notification.error({
              title: '错误',
              message: '请求错误，请联系管理员查看问题'
            })
          })
        } else {
          return false
        }
      })
    },
    // 资源浏览用户注册
    getCertificate (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(process.env.API_HOST + '/mclient/cer/gen_cer.php', qs.stringify({
            input1: this.registerBrowserFrom.name,
            input2: this.registerBrowserFrom.phone,
            input3: this.registerBrowserFrom.group,
            input4: this.registerBrowserFrom.secretKeyLocation,
            input5: this.registerBrowserFrom.realName,
            input6: this.registerBrowserFrom.IDCard,
            input7: this.registerBrowserFrom.description
          })).then(function (response) {
            Notification.success({
              title: '提示',
              message: response.data,
              duration: 0
            })
            that.closeDialog('registerBrowser')
          }).catch(function (error) {
            Notification.error({
              title: '错误',
              message: '请求错误，请联系管理员查看问题'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.formItem {
  width: 90%
}

.el-form-item {
  margin-bottom: 10px
}
</style>
