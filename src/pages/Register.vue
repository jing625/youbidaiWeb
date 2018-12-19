<template>

  <div id="register" class="register">
    <div class="bg-image">
      <div class="container">
        <form @submit.prevent="submitUser">
          <div class="loginForm">
            <h4>有币贷账号注册</h4>
            <div class="username-wrapper row">
              <input maxlength="11" v-model="user.username" placeholder=" 手机号码" class="username">
              <img src="@/assets/loginForm/CPM_btn_close.png" alt="" class="userIcon" @click="clearUser"
                   v-show="this.user.username">
            </div>

            <div class="nc-wrapper row">
              <div id="your-dom-id" class="nc-container"></div>
            </div>
            <div class="captcha-wrapper ">
              <input maxlength="6" v-model="user.captcha" placeholder=" 填写验证码" class="captcha">
              <button type="button" class="sendCaptcha" @click="getCaptcha"
                      :class="{cantSend: !canClick}" :disabled="!canClick">
                {{content}}
              </button>
            </div>
            <div class="row">
              <input v-model="user.inviteCode" placeholder="邀请码（选填）" class="inviteCode">
            </div>
            <div class="row">
              <button type="submit" @keyup.enter.prevent="submitUser" class="submit">注册</button>
            </div>
            <p class="agreement-wrapper">
              <input v-model="user.isAgree" type="checkbox" class="agreement" id="agreement">
              <label for="agreement">我已阅读并同意</label>
              <a href="" style="color: #FF8A14;">《服务和隐私条款》</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>


<script>
  import InitCaptcha from "@/vendor/aliyun/captcha"
  import {register as smsRegisterApi} from "@/api/sms";
  import {Message, MessageBox} from 'element-ui'
  import {mapGetters} from 'vuex'

  export default {
    name: "Login",
    data() {
      return {
        user: {
          username: '',
          captcha: '',
          inviteCode: '',
          isAgree: '',
        },
        ncToken: '',
        aliyunCaptcha: null,
        content: '发送验证码',   // 按钮里显示的内容
        totalTime: 60,
        canClick: true
      }
    },
    mounted: function () {
      this.isLogin()
      this.renderCaptcha()
    },
    computed: {
      ...mapGetters(['token'])
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
        smsRegisterApi({
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
        if (!this.canClick)
          return   //改动的是这两行代码
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
        } else if (!this.user.captcha) {
          Message('请输入验证码')
        } else if (!this.user.isAgree) {
          Message('同意协议才可注册')
        }
        if (this.user.username && this.user.captcha && this.user.isAgree) {
          this.$store.dispatch('Register', this.user)
            .then(res => {

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

  .register {
    background: url("../assets/loginForm/login_bg_line.png");
  }

  .register .bg-image {
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

  .loginForm {
    width: 425px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 120px;
  }

  h4 {
    font-size: 22px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-top: 40px;
  }

  .row {
    border-radius: 3px;
    margin-top: 30px;
    font-size: 16px;
  }

  .username-wrapper {
    position: relative;
  }

  .username, .inviteCode, .submit, .captcha {
    width: 324px;
    height: 50px;
    border-radius: 3px;
    font-size: 16px;
    border: 1px solid rgba(234, 234, 234, 1);
  }

  .nc-wrapper {
    width: 324px;
  }

  .captcha-wrapper {
    position: relative;
    margin-top: 30px;
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
    font-weight: 400;
    color: rgba(255, 138, 20, 1);
    line-height: 44px;
  }

  .cantSend {
    color: rgba(153, 153, 153, 1);
    cursor: not-allowed;
  }

  .agreement-wrapper {
    position: absolute;
    left: 50px;
    bottom: 120px;
    display: flex;
    align-items: center;
  }

  .agreement-wrapper > input {
    width: 18px;
    height: 18px;
    background: white;
  }

  .agreement-wrapper > label {
    margin-left: 10px;
  }

  .submit {
    background: rgba(255, 138, 20, 1);
    color: white;
    cursor: pointer;
    border-radius: 3px;
    font-size: 16px;
    border: none;
    margin: 34px 0 43px 0;
  }

  .userIcon {
    position: absolute;
    right: 20px;
    top: 18.5px;
    cursor: pointer;
    opacity: 0.7;
  }


</style>
