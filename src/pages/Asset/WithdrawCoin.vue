<template>
  <div class="withdrawCoin">
    <div class="container">
      <header>
        <h2>总资产（{{coinCode}}）：<span>{{coinInfo.coinQuantity}}</span></h2>
      </header>
      <main>
        <h3>提币地址</h3>
        <div class="address">
          <input type="text" placeholder="请输入提币地址" v-model="postData.coinAddress">
        </div>
        <h3>提币数量（剩余可提：{{coinInfo.coinQuantityAvailable}} {{coinCode}}）</h3>
        <div class="coinQuality">
          <div class="input-wrapper">
            <input type="text" placeholder="请输入提币数量" v-model="postData.coinQuantity" @change="countRealCoin">
            <span class="unit">{{coinCode}}</span>
            <button @click="allCoin">全部</button>
          </div>
        </div>
        <div class="show">
          <div class="items">
            <h3>手续费</h3>
            <div class="box">
              <span>{{coinInfo.transferPoundageQuantity}}</span>
              <span>{{coinCode}}</span>
            </div>
          </div>
          <div class="items">
            <h3>到账数量</h3>
            <div class="box">
              <span>{{realCoinQuantity}}</span>
              <span>{{coinCode}}</span>
            </div>
          </div>
        </div>
        <h3>资金密码</h3>
        <div class="password">
          <input :type="passwordType" placeholder="请输入资金密码" v-model="postData.walletPassword" maxlength="6">
          <img src="../../assets/loginForm/btn_pass_close.png" v-if="passwordType === 'password'"
               @click="changePasswordType">
          <img src="../../assets/loginForm/btn_pass_show.png" v-else @click="changePasswordType">
          <router-link to="/user/security/password2">忘记资金密码</router-link>
        </div>
        <div class="nc-wrapper">
          <div id="your-dom-id" class="nc-container"></div>
        </div>
        <h3 class="phoneRemind">请输入{{coinInfo.userPhoneNumber}}收到的短信验证码</h3>
        <div class="captcha-wrapper">
          <input maxlength="6" type="text" v-model="postData.captcha" autocomplete="off" placeholder=" 请填写验证码">
          <div class="btn-wrapper">
            <button type="button" class="sendCaptcha" @click="getCaptcha"
                    :class="{cantSend: !canClick}" :disabled="!canClick">
              {{content}}
            </button>
          </div>
          <div class="line"></div>
        </div>
        <div class="agreement-wrapper">
          <input type="checkbox" class="agreement" id="agreement" v-model="isAgree">
          <label for="agreement">我承诺我已确认提币请求信息正确，并再次确认提币地址正确，如若提币地址错误，风险自行承担</label>
        </div>
        <el-button type="primary" @click="withdrawCoin" :disabled="!forbidden">提币</el-button>
      </main>
    </div>
  </div>
</template>

<script>
  import InitCaptcha from "@/vendor/aliyun/captcha"
  import {withdrawCoin as smsWithdrawCoinApi} from "@/api/sms";
  import {realCoinQuantity, rechargeCoin, postWithdrawCoin} from "@/api/recharge";
  import {Message} from 'element-ui'

  export default {
    name: "WithdrawCoin",
    data() {
      return {
        coinInfo: this.$route.query.coinInfo,
        coinId: this.$route.query.coinId,
        coinCode: this.$route.query.coinCode,
        realCoinQuantity: '',
        postData: {
          captcha: '',
          coinAddress: '',
          coinId: this.$route.query.coinId,
          coinQuantity: '',
          walletPassword: '',
        },
        isAgree: '',
        content: '发送验证码',   // 按钮里显示的内容
        totalTime: 60,
        canClick: true,
        passwordType: 'password'
      }
    },
    computed: {
      forbidden() {
          return this.isAgree && this.postData.captcha && this.postData.coinAddress && this.postData.coinQuantity
                     && this.postData.walletPassword
      }
    },
    mounted: function () {
      this.renderCaptcha()
      this.getCoinInfo()
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
        smsWithdrawCoinApi({
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
        if (this.canClick) {
          this.canClick = false  //改动的是这两行代码
          this.content = this.totalTime + 's'
          let clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's'
            if (this.totalTime <= 0) {
              window.clearInterval(clock)  //这里重新开启
              this.content = '发送验证码'
              this.totalTime = 60
              this.canClick = true
            }
          }, 1000)
        }
      },
      changePasswordType() {
        this.passwordType = this.passwordType === "password" ? "text" : "password"
      },
      getCoinInfo() {
        if (!this.coinInfo.coinQuantityAvailable) {
          rechargeCoin({coinId: this.coinId}).then(res => {
            this.coinInfo = res
          })
        }
      },
      countRealCoin() {
        if (this.postData.coinQuantity) {
          this.$store.commit('setLoading',true)
          realCoinQuantity({coinId: this.coinId, coinQuantity: this.postData.coinQuantity}).then(res => {
            this.$store.commit('setLoading',false)

            this.realCoinQuantity = res.realCoinQuantity
          })
        } else {
          this.realCoinQuantity = ''
        }
      },
      withdrawCoin() {
        postWithdrawCoin(this.postData).then(res => {
          Message({
            message: '订单提交成功，待审核',
            type: 'success'
          })
        this.$router.push({path: '/asset/record', query: {coinInfo: '', coinId: this.coinId}})
        })
      },
      allCoin(){
        this.postData.coinQuantity = this.coinInfo.coinQuantityAvailable
        this.countRealCoin()
      }
    }
  }
</script>

<style scoped>
  h3 {
    font-size: 16px;
    color: #666666;
  }

  input:not([type=checkbox]) {
    padding-left: 12px;
    width: 1080px;
    height: 50px;
    border-radius: 3px;
    border: 1px solid #EAEAEA;
    font-size: 14px;
  }

  input::placeholder {
    color: #999999;
  }

  input:focus {
    outline: none;
    border: 1px solid #FF8A14;
  }

  .container {
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    margin-top: 30px;
    margin-bottom: 96px;
  }

  header {
    border-bottom: 1px solid #EAEAEA;
    height: 80px;
    display: flex;
    align-items: center;
  }

  header > h2 {
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
  }

  header > h2 > span {
    color: #FF8A14;
  }

  main {
    display: flex;
    flex-direction: column;
  }

  main > h3, main > .nc-wrapper, main > .show {
    margin: 30px 0 0 60px;
  }

  main > .address, main > .coinQuality > .input-wrapper, main > .password {
    margin: 10px 0 0 60px;
  }

  main > .coinQuality > .input-wrapper {
    position: relative;
    width: 1080px;
  }

  main > .coinQuality > .input-wrapper > .unit {
    position: absolute;
    color: #999999;
    font-size: 14px;
    display: inline-block;
    line-height: 15px;
    border-right: 1px solid #EAEAEA;
    padding-right: 20px;
    right: 75px;
    top: 17.5px;
  }

  main > .coinQuality > .input-wrapper > button {
    position: absolute;
    font-size: 14px;
    line-height: 14px;
    color: #FF8A14;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    top: 18px;
    right: 26px;
  }

  main > .show {
    display: flex;
    width: 1080px;
    justify-content: space-between;
  }

  main > .show > .items {
    /*display: flex;*/
  }

  main > .show > .items > .box {
    width: 510px;
    height: 50px;
    background: #F9F7FD;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
  }

  main > .show > .items > .box > span {
    color: #999999;
    margin: 0 20px;
    font-size: 14px;
  }

  main > .password {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 1080px;
  }

  main > .password > img {
    position: absolute;
    width: 22px;
    height: 12px;
    right: 20px;
    top: 19px;
    cursor: pointer;
  }

  main > .password > a {
    color: #999999;
    font-size: 14px;
    text-decoration: underline;
    margin-top: 10px;
  }

  main > .captcha-wrapper {
    margin: 10px 0 0 60px;
    position: relative;
    width: 1080px;
  }

  main > .captcha-wrapper > .btn-wrapper {
    width: 70px;
    position: absolute;
    top: 18px;
    right: 20px;
    display: flex;
    justify-content: center;
  }

  main > .captcha-wrapper > .btn-wrapper > button.sendCaptcha {
    border: none;
    outline: none;
    background: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 138, 20, 1);
    line-height: 14px;
  }

  main > .captcha-wrapper > .line {
    position: absolute;
    top: 17.5px;
    right: 110px;
    border-right: 1px solid #EAEAEA;
    height: 15px;
    width: 10px;
  }

  main > .agreement-wrapper {
    margin: 30px 0 0 60px;
    display: flex;
    align-items: center;

  }

  main > .agreement-wrapper > input {
    width: 20px;
    height: 20px;
    color: red;
    cursor: pointer;
  }

  main > .agreement-wrapper > label {
    color: #999999;
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
  }

  main > button {
    width: 1080px;
    height: 60px;
    margin: 50px 0 60px 60px;
    font-size: 18px;

  }

  .btnGray {
    background: #bbbbbb;
    color: #ffffff;
    cursor: not-allowed;
    border-color: #bbbbbb;
  }

  .cantSend {
    color: rgba(153, 153, 153, 1);
    cursor: not-allowed;
  }
</style>
