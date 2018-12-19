<template>
  <div id="user">
    <div class="user-wrapper" v-if="currentRoute ==='/user/security'">
      <div class="userInfo clearfix">
        <div style="float: left;">
          <!--<img :src="avatar" alt="" class="avatar" width="70px">-->
          <img src="@/assets/user/personalcenter_pic_defaulthead.png" alt="" class="avatar" width="70px">
        </div>
        <div style="float: left;">
          <div class="phoneNumber">{{userInfo.nickname}}</div>
          <div class="uid">UID:{{uid}}</div>
        </div>
      </div>
      <div class="security">
        <div class="userSecurity">
          <h2>账户安全</h2>
        </div>
        <div class="userPassword">
          <h3>登录密码</h3>
          <h4>保障账户安全</h4>
          <div class="remind">
            <div v-if="userInfo.isSetPassword">
              <div>已设置</div>
            </div>
            <div v-else>
              <img src="@/assets/user/personalcenter_icon_error.png" alt="">
              <span>未设置</span>
            </div>
          </div>
          <div class="reset">
            <router-link to="/user/security/password1">修改</router-link>
          </div>
        </div>
        <div class="walletPassword">
          <h3>资金密码</h3>
          <h4>独立资金密码，保障资产安全</h4>
          <div class="remind">
            <div v-if="userInfo.isSetWalletPassword">
              <div>已设置</div>
            </div>
            <div v-else>
              <img src="@/assets/user/personalcenter_icon_error.png" alt="">
              <span>未设置</span>
            </div>
          </div>
          <div class="reset">
            <router-link to="/user/security/password2">修改</router-link>
          </div>
        </div>
      </div>
      <div class="verification">
        <div class="verificationCenter">
          <h2>认证中心</h2>
        </div>
        <div class="userVerification">
          <h3>实名认证</h3>
          <h4>保障资金安全，借款安全，提升账户信用</h4>
          <div class="remind">
            <div v-if="userInfo.isReal">
              <div>已认证</div>
            </div>
            <div v-else>
              <img src="@/assets/user/personalcenter_icon_error.png" alt="">
              <span>未认证</span>
            </div>
          </div>
          <div class="reset">
            <router-link to="/user/security/verification" v-show="!userInfo.isReal">去认证</router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {getUserCenterInfo, getUserCenterSecurityInfo} from "@/api/user-center"

  export default {
    name: "User",
    data() {
      return {
        currentRoute: this.$route.path,
        userInfo: {}
      }
    },
    created() {
      this.getUserInfo()


    },
    watch: {
      $route() {
        this.getRoute()
        this.getUserInfo()

      }
    },
    computed: {
      ...mapGetters(['avatar', 'phoneNumber', 'uid']),
    },
    methods: {
      getRoute() {
        this.currentRoute = this.$route.path
      },
      getUserInfo() {
        getUserCenterSecurityInfo().then(res => {
          this.userInfo=Object.assign({},this.userInfo, res)
        })
        getUserCenterInfo().then(res => {
          this.userInfo=Object.assign({},this.userInfo, res)
        })

      }
    }
  }
</script>

<style scoped>
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }

  #user {
    background: #F5F6FA;
  }

  .userInfo {
    border: 1px solid rgba(235, 235, 235, 1);
    background: #ffffff;
  }

  .avatar {
    margin: 20px 20px 20px 40px;
  }

  .phoneNumber {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #333333;
    margin-top: 22px;
    line-height: 36px;
  }

  .uid {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #999999;
    margin-left: 5px;
  }

  .security, .verification {
    margin-top: 20px;
    background: #ffffff;
    overflow: hidden;
    border: 1px solid rgba(235, 235, 235, 1);
  }

  .userSecurity, .userPassword, .verificationCenter {
    border-bottom: 1px solid rgba(234, 234, 234, 1);
  }

  .userPassword, .walletPassword, .userVerification {
    margin: 0 30px;
    position: relative;
  }

  .remind > div {
    position: absolute;
    top: 35px;
    right: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remind > div > div {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-right: 12px;
  }

  .remind > div > span {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 96, 86, 1);
    margin-left: 10px;
  }

  .reset {
    position: absolute;
    right: 10px;
    top: 32px;
  }

  .reset > a {
    color: #FF8A14;
    font-size: 14px;
  }

  h2 {
    display: inline-block;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 30px 35px;
  }

  h3 {
    display: block;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 25px;
    margin-left: 12px;
  }

  h4 {
    display: block;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin: 13px 0 31px 12px;
  }

</style>
