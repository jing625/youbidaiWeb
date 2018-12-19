<template>
  <div class="header">
    <div class="fixed-wrapper">
      <div class="container">
        <router-link to="/">
          <img src="@/assets/nav/nav_logo.png" class="youbi" alt="有币贷" @click="activeName='/'">
        </router-link>
        <nav class="topNav">
          <el-tabs v-model="activeName" @tab-click="handleClick" :value="activeName">
            <el-tab-pane label="首页" name="/"></el-tab-pane>
            <el-tab-pane label="借款" name="loan"></el-tab-pane>
            <el-tab-pane label="资产" name="asset"></el-tab-pane>
            <el-tab-pane label="App下载" name="download"></el-tab-pane>
            <el-tab-pane label="帮助中心" name="help"></el-tab-pane>
          </el-tabs>
        </nav>
        <div class="user" v-if="!nickname">
          <router-link to="/auth/login">
            <button class="login" id="login" :class="{loginSelected:!isRegister}" @click="selectLogin()">登录</button>
          </router-link>
          <router-link to="/auth/register">
            <button class="register" :class="{loginSelected:isRegister}" @click="selectRegister()">注册</button>
          </router-link>
        </div>
        <div class="userInfo-wrapper" v-else>
          <el-dropdown trigger="click" class="userInfo" @command="handleCommand" @visible-change="activeTriangle">
            <div class="userName">
              {{nickname|asterisk}}
              <i v-if="triangle" class="el-icon-caret-bottom" id="triangle"></i>
              <i v-else class="el-icon-caret-bottom"></i>

            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" style="color: #666666;">个人中心</el-dropdown-item>
              <el-dropdown-item command="b" style="color: #666666;">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {

    name: "Header",
    data() {
      return {
        isRegister: this.$route.path === '/auth/register',
        activeName: this.$route.path.slice(1) || '/',
        triangle: false
      }
    },
    filters: {
      asterisk(phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      }
    },
    computed: {
      ...mapGetters(['nickname']),
    },
    created() {
      this.GetUserInfo()
      let matched = this.$route.matched.filter(item => item.name)
      console.log(this.activeName)

    },

    methods: {
      ...mapActions(['GetUserInfo']),
      handleCommand(command) {
        if (command === 'a') {

          this.GetUserInfo().then(res => {

          }).then(() => {
            this.$router.push({path: '/user/security'})
          })

        }
        if (command === 'b') {
          let matched = this.$route.matched.filter(item => item.name)
          this.$store.dispatch('LogOut').then(() => {
            if (matched[0].name === '资产' || matched[0].name=== '个人中心' ) {
              this.$router.push({path: '/'})
            }
            else if (matched[0].name === '借款'){
              if (matched[1].name !== '借款') {
                this.$router.push({path: '/'})
              }
            }
          })
        }
      },
      handleClick(tab) {
        switch (tab.name) {
          case '/' :
            this.$router.push({path: '/'})
            break
          case 'loan' :
            this.$router.push({path: '/loan'})
            break
          case 'asset' :
            this.$router.push({path: '/asset'})
            break
          case 'download' :
            this.$router.push({path: '/download'})
            break
          case 'help' :
            this.$router.push({path: '/help'})
            break
        }
      },
      selectLogin() {
        this.activeName = ''
        this.isRegister = false
      },
      selectRegister() {
        this.activeName = ''
        this.isRegister = true
      },
      activeTriangle() {
        this.triangle = !this.triangle
      }
    }
  }
</script>


<style scoped>
  .header {
    height: 70px;

  }

  .fixed-wrapper {
    position: fixed;
    height: 70px;
    margin: 0 auto;
    left: 0;
    right: 0;
    background: #ffffff;
    z-index: 10;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  }

  button {
    outline: none;
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    align-items: center;
    position: relative;
  }

  .userInfo {
    cursor: pointer;
    display: flex;
    position: absolute;
    right: 16px;
    top: 24px;
  }

  .userName {

  }

  .el-icon-caret-bottom {

  }

  .topNav {
    display: flex;
    font-size: 14px;
    margin-left: 75px;
  }

  .topNav div {
    margin: 0 15px;
    cursor: pointer;
    position: relative;
  }

  .user {
    display: flex;
    position: absolute;
    right: 10px;
    font-size: 14px;

  }

  .login, .register {
    width: 58px;
    height: 33px;
    border-radius: 3px;
    line-height: 33px;
    margin-right: 10px;
    color: #666666;
    transition: all 0.5s;
  }

  /*.topNavSelected {*/
  /*color: #F08519;*/
  /*}*/

  .loginSelected {
    color: #ffffff;
    background: #FF8A14;
  }

  .login:hover,.register:hover{
    color: #ffffff;
    background: #FF8A14;
  }


</style>
<style>
  #triangle {
    transform: rotate(180deg);
    color: #FF8A14;
  }
  .el-tabs__nav-wrap::after{
    background-color: #ffffff;
    height: 3px;
    /*bottom: 100px;*/
  }
</style>
