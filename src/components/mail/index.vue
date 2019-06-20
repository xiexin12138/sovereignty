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
  <el-container>
    <el-header style="text-align: left;">
      <el-button type="primary" size="mini" icon="el-icon-edit" style="margin-top:15px" @click="newMail">写邮件</el-button>
    </el-header>
    <el-main>
      <el-table :data="maillist" @row-click="maillist_row_click">
        <el-table-column prop="date" label="日期" width="200">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column prop="content" label="内容" :show-overflow-tooltip='true'>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <el-dialog title="新邮件" :visible.sync="dialogVisible" width="60%" style="height:100%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input style="width: 50%;" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input style="width: 50%;" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" style="width: 90%;" :rows="8" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog :title="dialog_content.title" :visible.sync="dialogVisible_content" width="60%" style="height:100%" :before-close="handleClose_content">
    <el-container>
      <el-row>
        <el-col :span="24">
          <div style="font-size:16px;padding:5px">
            <strong>时间：</strong>{{this.dialog_content.date}}
          </div>
          <div style="font-size:16px;padding:5px">
            <strong>地址：</strong>{{this.dialog_content.addr}}
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
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible_content: false,
      form: {
        name: '',
        content: '',
        address: ''
      },
      maillist: [],
      inbox: [{
        date: "2019-6-14 09:58:59",
        title: "test收件箱",
        addr: 'sam12138@123.com',
        content: "test"
      }, {
        date: "2019-6-14 09:58:59",
        title: "tes123t",
        addr: 'sam12138@123.com',
        content: "test"
      }, {
        date: "2019-6-14 09:58:59",
        title: "tes阿斯蒂芬t",
        addr: 'sam12138@123.com',
        content: "test"
      }, {
        date: "2019-6-14 09:58:59",
        title: "test去微软",
        addr: 'sam12138@123.com',
        content: "test"
      }, {
        date: "2019-6-14 09:58:59",
        title: "tes现场v下t",
        addr: 'sam12138@123.com',
        content: "test"
      }],
      outbox: [{
        date: "2019-6-14 09:58:59",
        title: "outboxtest",
        addr: 'sam12138@123.com',
        content: "发件箱"
      }, {
        date: "2019-6-14 09:58:59",
        title: "te阿斯蒂芬st",
        addr: 'sam12138@123.com',
        content: "t许昌吧est"
      }, {
        date: "2019-6-14 09:58:59",
        title: "tesvbnt",
        addr: 'sam12138@123.com',
        content: "te投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入stte投入st"
      }, {
        date: "2019-6-14 09:58:59",
        title: "tes吧v才能t",
        addr: 'sam12138@123.com',
        content: "tes看i一块t"
      }, {
        date: "2019-6-14 09:58:59",
        title: "tes的观点t",
        addr: 'sam12138@123.com',
        content: "t绕太阳est"
      }],
      dialog_content: {
        title: '',
        date: '',
        addr: '',
        content: ''
      }
    };
  },
  mounted() {
    this.maillist = this.inbox
    const that = this
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
    newMail() {
      this.dialogVisible = true
    },
    handleSelect(key, keyPath) {
      // 如果为跳回首页
      if (key == 0) {
        this.$router.push('/')
        // 如果为收件箱
      } else if (key == 1) {
        this.maillist = this.inbox
        // 如果为发件箱
      } else if (key == 2) {
        this.maillist = this.outbox
      }
    },
    maillist_row_click(row) {
      this.dialogVisible_content = true
      this.dialog_content.content = row.content
      this.dialog_content.title = row.title
      this.dialog_content.date = row.date
      this.dialog_content.addr = row.addr
    },
    handleClose_content(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  }
}
</script>

<style>
</style>
