<template>
  <div id="walletPassword">
    <h2>设置资金密码</h2>
    <div class="form-wrapper">
      <div class="nc-wrapper">
        <div id="your-dom-id" class="nc-container"></div>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top"
               label-width="90px" class="demo-ruleForm">
        <div class="captcha-wrapper">
          <el-form-item label="手机验证码" style="font-size: 16px">
            <el-input maxlength="6" type="text" v-model="captcha" autocomplete="off"
                      :placeholder=placeholder></el-input>
          </el-form-item>
          <div class="captchaBtn-wrapper">
            <button type="button" class="sendCaptcha" @click="getCaptcha"
                    :class="{cantSend:!canClick}" :disabled="!canClick">
              {{content}}
            </button>
          </div>
        </div>
        <el-form-item label="资金密码" prop="pass" style="font-size: 16px">
          <el-input maxlength="6" type="password" v-model="ruleForm.pass" autocomplete="off"
                    placeholder="请输入资金密码(6位数字)"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="font-size: 16px">
          <el-input maxlength="6" type="password" v-model="ruleForm.checkPass" autocomplete="off"
                    placeholder="请再次确认密码(6位数字)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import InitCaptcha from "@/vendor/aliyun/captcha"
  import {resetWalletPass as smsResetWalletPassApi} from "@/api/sms";
  import {resetWalletPassword} from "@/api/wallet";
  import {Message, MessageBox} from 'element-ui'
  import {mapGetters} from 'vuex'

  export default {
    name: "WalletPassword",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        captcha: '',
        aliyunCaptcha: null,
        ncToken: '',
        content: '发送验证码',   // 按钮里显示的内容
        totalTime: 60,
        canClick: true,
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }
      };
    },
    mounted: function () {
      this.renderCaptcha()
    },
    computed: {
      isGray() {
        return !this.ruleForm.pass || !this.ruleForm.checkPass
      },
      ...mapGetters(['nickname']),
      placeholder() {
        return "请输入" + this.nickname + "收到的短信验证码"
      }
    },
    methods: {
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
              console.log(data)

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
      getCaptcha() {

        if (!this.aliyunCaptcha) {
          Message('请先进行滑动验证')
          return
        }
        smsResetWalletPassApi({
          // phoneNumber: this.phoneNumber,
          aliyunCaptchaSessionId: this.aliyunCaptcha.csessionid,
          aliyunCaptchaSig: this.aliyunCaptcha.sig,
          aliyunCaptchaNCToken: this.ncToken,
          aliyunCaptchaScene: 'nc_register'
        }).then(res => {
          console.log(res)
          Message({message:'短信验证码已发送至您的手机,请注意查收',type:'success'})
          setTimeout(()=>{
            __nc.reset()
            this.aliyunCaptcha = null
          },60000)
        })
        // /*-----------控制验证码频率------*/
        if (!this.canClick)
          return   //改动的是这两行代码
        this.canClick = false
        this.content = this.totalTime + 's'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's'
          if (this.totalTime <= 0) {
            window.clearInterval(clock)
            this.content = '发送验证码'
            this.totalTime = 60
            this.canClick = true   //这里重新开启
          }
        }, 1000)


      },
      submitForm() {
        if (this.ruleForm.pass === this.ruleForm.checkPass) {
          resetWalletPassword({captcha: this.captcha, password: this.ruleForm.checkPass})
            .then(() => {
              this.$alert('资金密码设置成功', {
                confirmButtonText: '确定'
              }).then(() => {
                this.$router.push({path: '/user'})
              })
            })
        } else {
          this.$alert('两次输入密码不一致！', {
            confirmButtonText: '确定',
            type: 'error',
          })
        }
      },
    }

  }
</script>

<style scoped>
  #walletPassword {
    background: #ffffff;
    overflow: auto;
    border: 1px solid rgba(235, 235, 235, 1);
  }

  #walletPassword h2 {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 30px 35px 30px 35px;
    line-height: 18px;
  }

  .form-wrapper {
    width: 869px;
    margin: 0 auto;
  }

  .captcha-wrapper {
    position: relative;
  }

  .phoneRemind {
    color: #999999;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    margin: 20px 0 20px 0;
  }

  .captchaBtn-wrapper {
    position: absolute;
    top: 53.5px;
    right: 10px;
    border-left: 1px solid rgba(234, 234, 234, 1);
    width: 90px;
    line-height: 14px;
    text-align: center;
  }

  .sendCaptcha {
    border: none;
    outline: none;
    background: white;
    cursor: pointer;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 138, 20, 1);
    line-height: 14px;
    margin-left: 16px;
  }

  .nc-wrapper {
    margin-bottom: 30px;
  }

  .btnGray {
    background: #bbbbbb;
    color: #ffffff;
    cursor: not-allowed;
    border-color: #bbbbbb;
  }

  .cantSend {
    cursor: not-allowed;
  }

</style>
<style>
  #walletPassword .el-form-item {
    margin-bottom: 20px;
  }

  #walletPassword .el-form--label-top .el-form-item__label {
    padding: 0;
    font-size: 16px;
    line-height: 16px;
    margin: 10px 0;
  }

  #walletPassword .el-input__inner {
    border-radius: 3px;
    width: 869px;
    height: 50px;
    font-size: 14px;
    color: #333333;
  }

  #walletPassword .el-form-item .el-button {
    width: 869px;
    height: 60px;
    margin-bottom: 70px;
    font-size: 18px;
    border-radius: 3px;
  }

</style>
