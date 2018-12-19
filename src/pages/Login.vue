<template>
  <div id="login" class="login">
    <div class="bg-image">
      <div class="container">
        <form @submit.prevent="submitUser">
          <div class="loginForm" v-show="!loginType">
            <h4>有币贷账号登录</h4>
            <div class="row username-wrapper">
              <input maxlength="11" v-model="user.username" placeholder=" 手机号码" class="username" autofocus>
              <img src="@/assets/loginForm/CPM_btn_close.png" alt="" class="userIcon" @click="clearUser"
                   v-show="this.user.username">
            </div>
            <div class="row password-wrapper">
              <input v-model="user.password" :type="passwordType" placeholder=" 密码" class="password">
              <img :src="imgSrc" alt="显示/隐藏" @click="passType()" class="passIcon">
            </div>
            <div class="row">
              <button type="submit" class="submit" @keyup.enter.prevent="submitUser">登录</button>
            </div>
            <div class="signLink-wrapper">
              <div class="signLink link" @click="changeLoginType">快捷登录</div>
              <div class="passwordLink link">
                <router-link to="/auth/forget-password">忘记密码</router-link>
              </div>
            </div>
          </div>
        </form>
        <form @submit.prevent="submitUserByPhone">
          <div class="messageLoginForm" v-show="loginType">
            <h4>有币贷账号登录</h4>
            <div class="row username-wrapper">
              <input maxlength="11" v-model="user.username" placeholder=" 手机号码" class="username" autofocus>
              <img src="@/assets/loginForm/CPM_btn_close.png" class="userIcon" @click="clearUser"
                   v-show="this.user.username">
            </div>
            <div class="nc-wrapper row">
              <div id="your-dom-id" class="nc-container"></div>
            </div>
            <div class="captcha-wrapper">
              <input maxlength="6" v-model="user.captcha" placeholder=" 填写验证码" class="captcha">
              <button type="button" class="sendCaptcha" @click="getCaptcha" :class="{cantSend: !canClick}"
                      :disabled="!canClick">
                {{content}}
              </button>
            </div>
            <div class="row">
              <button type="submit" class="submit" @keyup.enter.prevent="submitUserByPhone">快捷登录</button>
            </div>
            <div class="signLink-wrapper">
              <div class="signLink link" @click="changeLoginType">密码登录</div>
              <div class="passwordLink link">
                <router-link to="/auth/forget-password">忘记密码</router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import InitCaptcha from "@/vendor/aliyun/captcha"
  import {login as smsLoginApi} from "@/api/sms";
  import {Message, MessageBox} from 'element-ui'
  import {mapGetters} from 'vuex'

  export default {
    name: "Login",
    data() {
      return {
        user: {
          username: '',
          captcha: '',
          password: '',
        },
        ncToken: '',
        aliyunCaptcha: null,
        content: '发送验证码',   // 按钮里显示的内容
        totalTime: 60,
        canClick: true,
        imgSrc: require('@/assets/loginForm/btn_pass_close.png'),
        passwordType: 'password',
        loginType: true
      }
    },
    mounted: function () {
      this.isLogin()
      this.renderCaptcha()
    },
    computed: {
      ...mapGetters(['token']),
    },
    methods: {
      isLogin() {
        if (this.token) {
          this.$router.push('/')
        }
      },
      renderCaptcha() {
        InitCaptcha()
        var nc_token = ["FFFF0N00000000006E34", (new Date()).getTime(), Math.random()].join(':');
        this.ncToken = nc_token
        var NC_Opt =
          {
            renderTo: "#your-dom-id",
            appkey: "FFFF0N00000000006E34",
            scene: "nc_register",
            token: nc_token,
            customWidth: 300,
            trans: {"key1": "code0"},
            elementID: ["usernameID"],
            is_Opt: 0,
            language: "cn",
            isEnabled: true,
            timeout: 3000,
            times: 5,
            apimap: {
              // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
              // 'get_captcha': '//b.com/get_captcha/ver3',
              // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
              // 'get_img': '//c.com/get_img',
              // 'checkcode': '//d.com/captcha/checkcode.jsonp',
              // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
              // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
              // 'umid_serUrl': 'https://g.com/service/um.json'
            },
            callback: (data) => {

//            window.console && console.log(nc_token)
//            window.console && console.log(data.csessionid)
//            window.console && console.log(data.sig)

              this.aliyunCaptcha = data


            }
          }
        var nc = new noCaptcha(NC_Opt)
        nc.upLang('cn', {
          _startTEXT: "请按住滑块，拖动到最右边",
          _yesTEXT: "验证通过",
          _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
          _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        })
      },
      clearUser() {
        this.user.username = ''
      },
      passType() {
        this.passwordType = this.passwordType === 'password' ? 'text' : "password"
        this.imgSrc = this.imgSrc === require('@/assets/loginForm/btn_pass_close.png') ?
          require('@/assets/loginForm/btn_pass_show.png') :
          require('@/assets/loginForm/btn_pass_close.png')
      },
      changeLoginType() {
        this.loginType = !this.loginType
      },
      getCaptcha() {

        if (!this.aliyunCaptcha) {
          Message('请先进行滑动验证')
          return
        }

        var reg = /^1[3|4|5|7|8|9][0-9]{9}$/
        if (!reg.test(this.user.username)) {
          Message({message: '手机号码格式错误', type: 'error'})
          return
        }
        smsLoginApi({
          phoneNumber: this.user.username,
          aliyunCaptchaSessionId: this.aliyunCaptcha.csessionid,
          aliyunCaptchaSig: this.aliyunCaptcha.sig,
          aliyunCaptchaNCToken: this.ncToken,
          aliyunCaptchaScene: 'nc_register'
        }).then(res => {
          console.log(res)
          Message({message: '短信验证码已发送至您的手机,请注意查收', type: 'success'})
          setTimeout(() => {
            __nc.reset()
            this.aliyunCaptcha = null
          }, 60000)
        })
        // /*-----------控制验证码频率------*/
        if (!this.canClick) return   //改动的是这两行代码
        this.canClick = false
        this.content = `重发验证码(${this.totalTime}s)`
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = `重发验证码(${this.totalTime}s)`
          if (this.totalTime <= 0) {
            window.clearInterval(clock)
            this.content = '重发验证码'
            this.totalTime = 60
            this.canClick = true   //这里重新开启
          }
        }, 1000)
      },
      submitUser() {
        if (!this.user.username) {
          Message('请输入手机号码')
        } else if (!this.user.password) {
          Message('请输入密码')
        }
        if (this.user.username && this.user.password) {
          this.$store.dispatch('Login', this.user).then(res => {
            this.$router.push({path: '/'})
          })
        }


      },
      submitUserByPhone() {
        if (!this.user.username) {
          Message('请输入手机号码')
        } else if (!this.user.captcha) {
          Message('请输入验证码')
        }
        if (this.user.username && this.user.captcha) {
          this.$store.dispatch('LoginByPhone', this.user).then(res => {
            this.$router.push({path: '/'})
          })
        }
      }

    }
  }
</script>

<style scoped>

  input {
    padding-left: 10px;
  }

  input:focus {
    outline: none;
    border: 1px solid #FF8A14;
  }

  .login {
    background: url("../assets/loginForm/login_bg_line.png");
  }

  .login .bg-image {
    background: url("../assets/loginForm/login_bg.png");
    width: 1200px;
    height: 766px;
    margin: 0 auto;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    flex-direction: row-reverse;

  }

  .loginForm, .messageLoginForm {
    width: 425px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 132px;
  }

  h4 {
    display: inline;
    font-size: 22px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-top: 60px;
  }

  .row {
    border-radius: 3px;
    margin-top: 30px;
    font-size: 16px;
  }

  .username, .submit, .captcha, .password {
    width: 324px;
    height: 50px;
    border-radius: 3px;
    font-size: 16px;
    border: 1px solid rgba(234, 234, 234, 1);
  }

  .submit {
    background: rgba(255, 138, 20, 1);
    color: white;
    cursor: pointer;
  }

  .password-wrapper, .username-wrapper {
    position: relative;
  }

  .captcha-wrapper {
    position: relative;
    margin-top: 30px;
  }

  .nc-wrapper {
    width: 324px;
  }

  .sendCaptcha {
    position: absolute;
    top: 3px;
    right: 20px;
    border: none;
    outline: none;
    background: white;
    cursor: pointer;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 138, 20, 1);
    line-height: 44px;
  }

  .cantSend {
    color: rgba(153, 153, 153, 1);
    cursor: not-allowed;
  }

  .signLink-wrapper {
    display: flex;
    width: 324px;
    justify-content: space-between;
  }

  .link {
    /*width: 324px;*/
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
    margin: 20px 0 50px 0;

  }

  .signLink {
    color: rgba(255, 138, 20, 1);
  }

  .userIcon {
    position: absolute;
    right: 20px;
    top: 17px;
    cursor: pointer;
    opacity: 0.7;
  }

  .passIcon {
    position: absolute;
    right: 20px;
    top: 18.5px;
    width: 19px;
    height: 13px;
    cursor: pointer;
  }
</style>
