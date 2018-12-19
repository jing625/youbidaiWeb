<template>
  <div id="verification">
    <h2>认证中心</h2>
    <div class="form-wrapper">
      <el-form :model="userInfo" status-icon label-width="100px" class="demo-ruleForm" label-position="top">
        <el-form-item label="姓名"  style="font-size: 16px">
          <el-input type="text" v-model="userInfo.name" autocomplete="off"
                    placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard" style="font-size: 16px">
          <el-input maxlength="18" type="text" v-model="userInfo.idCard" autocomplete="off"
                    placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="bankCardNumber" style="font-size: 16px">
          <el-input type="text" v-model="userInfo.bankCardNumber" autocomplete="off"
                    placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="所属银行" prop="bankCardProvider" style="font-size: 16px">
          <el-input maxlength="18" type="text" v-model="userInfo.bankCardProvider" autocomplete="off"
                    placeholder="请输入所属银行"></el-input>
        </el-form-item>
        <el-form-item label="银行卡预留手机号码" prop="bankCardPhoneNumber" style="font-size: 16px">
          <el-input maxlength="18" type="text" v-model="userInfo.bankCardPhoneNumber" autocomplete="off"
                    placeholder="请输入银行卡预留手机号"></el-input>
        </el-form-item>
        <div class="nc-wrapper">
          <div id="your-dom-id" class="nc-container"></div>
        </div>
        <div class="captcha-wrapper">
          <el-form-item label="手机验证码" style="font-size: 16px">
            <el-input maxlength="6" type="text" v-model="userInfo.captcha" autocomplete="off" style="width: 500px;"
                      placeholder=" 填写验证码"></el-input>
          </el-form-item>
          <div class="captchaBtn-wrapper">
            <button type="button" class="sendCaptcha" @click="getCaptcha"
                    :class="{cantSend: isGray||!canClick}" :disabled="isGray||!canClick">
              {{content}}
            </button>
          </div>
        </div>
        <p>为了你的资金安全，需验证你的身份并绑定银行卡才可以进行其他操作；认证信息一经验证无法修改，请务必如实填写。</p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            提交认证
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import InitCaptcha from "@/vendor/aliyun/captcha"
  import {verification as smsVerificationApi} from "@/api/sms";
  import {submitVerification} from "@/api/information-verification";
  import {Message, MessageBox} from 'element-ui'
  import {mapGetters} from 'vuex'

  export default {
    name: "WalletPassword",
    data() {
      return {
        userInfo: {
          name: '',
          idCard: '',
          bankCardNumber: '',
          bankCardProvider: '',
          bankCardPhoneNumber: '',
          captcha: ''
        },
        aliyunCaptcha: null,
        ncToken: '',
        content: '发送验证码',   // 按钮里显示的内容
        totalTime: 60,
        canClick: true,

      };
    },
    mounted: function () {
      this.renderCaptcha()
    },
    computed: {
      isGray() {
        return !this.userInfo.name || !this.userInfo.idCard || !this.userInfo.bankCardNumber
          || !this.userInfo.bankCardProvider || !this.userInfo.bankCardPhoneNumber
      },
      ...mapGetters(['phoneNumber'])
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
        smsVerificationApi({
          phoneNumber: this.phoneNumber,
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
        submitVerification(this.userInfo)
          .then(() => {
            this.$alert('实名认证成功', {
              confirmButtonText: '确定'
            }).then(() => {

              this.$router.push({path: '/user'})
            })
          })
      },
    }

  }
</script>


<style scoped>
  #verification {
    background: #ffffff;
    overflow: auto;
    border: 1px solid rgba(235, 235, 235, 1);
  }

  #verification h2 {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 30px 35px 20px 35px;
    line-height: 18px;
  }

  #verification p {
    display: inline-block;
    width: 504px;
    height: 39px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 26px;
    margin-bottom: 30px;
  }

  #verification > .form-wrapper {
    width: 869px;
    margin: 0 auto;
  }

  .captcha-wrapper {
    position: relative;
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
    margin-left: 0px;
    margin-bottom: 10px;
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
  #verification > .form-wrapper .el-form-item {
    margin-bottom: 20px;
  }

  #verification > .form-wrapper .el-form--label-top .el-form-item__label {
    padding: 0;
    font-size: 16px;
    line-height: 16px;
    margin: 10px 0;
  }

  #verification > .form-wrapper .el-input__inner {
    border-radius: 3px;
    width: 869px;
    height: 50px;
    font-size: 14px;
    color: #333333;
  }

  #verification > .form-wrapper .el-form-item .el-button {
    width: 869px;
    height: 60px;
    margin-bottom: 70px;
    font-size: 18px;
    border-radius: 3px;
  }

</style>
