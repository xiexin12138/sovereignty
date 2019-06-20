<template>
<div style="height:100%;width:100%;background-color:#EBEEF5">
  <el-row style="height:80px;padding-left:50px;display: flex;">
    <div style="margin:10px 0 10px 0;height:60px;border-right:1px solid #606266;display: flex;
  align-items:center;justify-content:center;font-size:20px;padding-right:20px">
      <el-button icon="el-icon-back" @click="goBack" style="border-radius:0px">返回</el-button>
    </div>
    <div style="padding:15px 0 0 20px;font-size:35px;color:#000000">国家主权网</div>
  </el-row>
  <el-row :gutter="40" type="flex" justify="center" :style="loginBg" class="hidden-xl-only">
    <el-col :span="8" style="border:1px black;height:400px">
      <!-- <el-image :src="require('@/assets/login.png')"></el-image> -->
    </el-col>
    <el-col :span="8" style="border:1px black;height:400px;margin-top:50px;max-width:500px">
      <el-card class="box-card">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <h2> 用户登录 </h2>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="20%" :rules="rules" status-icon>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" style="width:80%;border-radius:0px" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="psw">
            <el-input v-model="form.psw" type="password" style="width:80%;border-radius:0px" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('form')" style="width:80%;border-radius:0px">登 录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="width:80%;border-radius:0px">注 册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="40" type="flex" justify="center" :style="loginBigBg" class="hidden-lg-and-down">
    <el-col :span="8" style="border:1px black;height:400px">
      <!-- <el-image :src="require('@/assets/login.png')"></el-image> -->
    </el-col>
    <el-col :span="8" style="border:1px black;height:400px;margin-top:50px;max-width:500px">
      <el-card class="box-card">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <h2> 用户登录 </h2>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="20%" :rules="rules">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" style="width:80%;border-radius:0px" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="psw">
            <el-input v-model="form.psw" type="password" style="width:80%;border-radius:0px" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('form')" style="width:80%;border-radius:0px">登 录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="width:80%;border-radius:0px">注 册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
  <el-row style="position:fixed;display: flex; bottom:0;width:100%;height:50px;align-items: center;justify-content: center;">
    @北京大学深圳研究生院 未来网络北大实验室
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        psw: '',
      },
      loginBigBg: {
        background: "url(" + require("@/assets/login_large.png") + ")",
        height: "65%",
        width: "100%",
        margin: "0"
      },
      loginBg: {
        background: "url(" + require("@/assets/login.png") + ")",
        height: "65%",
        width: "100%",
        margin: "0"
      },
      rules: {
        name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12 个字符',
            trigger: 'blur'
          }
        ],
        psw: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("this.form", this.form);
          this.$router.push('/mail')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
