<template>
  <div class="loan">
    <div class="container">
      <nav>
        <div class="borrow" :class="{borrowPageSelect:1}">借款</div>
        <div v-show="token" class="borrowRecord" :class="{borrowRecordSelect:0}" @click="goBorrowRecord">
         借款记录
        </div>
        <div></div>
      </nav>
      <main>
        <h4>选择质押币种</h4>
        <div class="coinsWrapper">
          <div class="BTC" @click="selectCoin('btc')" :class="{selectBorder:coin==='btc'}">
            <img src="@/assets/loan/icon_btc_click.png" v-if="coin==='btc'">
            <img src="@/assets/loan/icon_btc_default.png" v-else>
            <div>
              <h5>BTC</h5>
              <h6 v-show="coin==='btc'">{{coinInfo.price}}</h6>
            </div>
            <img src="@/assets/loan/borrow_pitchon.png" class="icon" v-show="coin==='btc'">
          </div>
          <div class="ETH" @click="selectCoin('eth')" :class="{selectBorder:coin==='eth'}">
            <img src="@/assets/loan/icon_eth_click.png" v-if="coin==='eth'">
            <img src="@/assets/loan/icon_eth_default.png" v-else>
            <div>
              <h5>ETH</h5>
              <h6 v-show="coin==='eth'">{{coinInfo.price}}</h6>
            </div>
            <img src="@/assets/loan/borrow_pitchon.png" class="icon" v-show="coin==='eth'">
          </div>
          <div class="LTC" @click="selectCoin('ltc')" :class="{selectBorder:coin==='ltc'}">
            <img src="@/assets/loan/icon_ltc_click.png" v-if="coin==='ltc'">
            <img src="@/assets/loan/icon_ltc_default.png" v-else>
            <div>
              <h5>LTC</h5>
              <h6 v-show="coin==='ltc'">{{coinInfo.price}}</h6>
            </div>
            <img src="@/assets/loan/borrow_pitchon.png" class="icon" v-show="coin==='ltc'">
          </div>
          <div class="ETC" @click="selectCoin('etc')" :class="{selectBorder:coin==='etc'}">
            <img src="@/assets/loan/icon_etc_click.png" v-if="coin==='etc'">
            <img src="@/assets/loan/icon_etc_default.png" v-else>
            <div>
              <h5>ETC</h5>
              <h6 v-show="coin==='etc'">{{coinInfo.price}}</h6>
            </div>
            <img src="@/assets/loan/borrow_pitchon.png" class="icon" v-show="coin==='etc'">
          </div>
          <div class="GTC" @click="selectCoin('gtc')" :class="{selectBorder:coin==='gtc'}">
            <img src="@/assets/loan/icon_gtc_click.png" v-if="coin==='gtc'">
            <img src="@/assets/loan/icon_gtc_default.png" v-else>
            <div>
              <h5>GTC</h5>
              <h6 v-show="coin==='gtc'">{{coinInfo.price}}</h6>
            </div>
            <img src="@/assets/loan/borrow_pitchon.png" class="icon" v-show="coin==='gtc'">
          </div>
        </div>
        <div class="info-wrapper">
          <div class="inputInfo">
            <h4>输入借款信息</h4>
            <div class="row">
              <span>借款金额</span>
              <div class="input-wrapper">
                <input type="text" v-model="countParam.total" @change="countCoinTotal" placeholder="请输入借款金额（10000起借）">
                <span>CNY</span>
              </div>
            </div>
            <div class="row">
              <span>借款天数</span>
              <div class="input-wrapper">
                <input type="text" v-model="countParam.days" @change="countCoinTotal" placeholder="请输入借款天数(7~30)">
                <span>天</span>
              </div>
            </div>
            <div class="row">
              <span>质押数量</span>
              <div class="input-wrapper">
                <div class="coin-content">
                  {{coinInfo.quantity | toMoreZero}}
                </div>
                <span>{{coin|toUpperCase}}</span>
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div class="outputInfo">
            <h4>实际到账：<span>{{coinInfo.realTotal | toZero}}元</span></h4>
            <div class="table-wrapper">
              <div class="row">
                <div style="width: 190px;">质押币种：<span>{{coin|toUpperCase}}</span></div>
                <div style="width: 250px;">质押数量：<span>{{coinInfo.quantity | toMoreZero}}</span></div>
                <div style="width: 190px;">质押率：<span>{{coinInfo.loanRatio | toBlank}}</span></div>
              </div>
              <div class="row">
                <div style="width: 190px;">手续费：<span>{{coinInfo.poundage | toZero}}元</span></div>
                <div style="width: 250px;">申请时间：<span>{{postData.date | toBlank}}</span></div>
                <div style="width: 190px;">借款期限：<span>{{countParam.days | addUnit}}</span></div>
              </div>
            </div>
            <p class="agreement-wrapper">
              <el-checkbox v-model="isAgree" class="agreement" id="agreement">我已阅读并同意</el-checkbox>
              <a :href="previewContractUrl" target="_blank" v-if="token&&notBlank">《抵押借款协议》</a>
              <a href="#" @click="reminder" v-else>《抵押借款协议》</a>
            </p>
            <el-button type="primary" @click="goLoan" :disabled="!notBlank">质押贷款</el-button>
          </div>
        </div>

        <el-dialog :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
          <img src="@/assets/loan/CPM_pic_bg.png">
          <p>借款前，请先完成以下安全设置</p>
          <div class="identify">
            <span>身份认证</span>
            <span v-if="userInfo.isReal">已认证</span>
            <span v-else>未认证</span>
          </div>
          <span slot="footer" class="dialog-footer">
             <router-link to="/user/security/verification">
               <el-button class="confirmSet" type="primary" @click="dialogVisible = false">前往认证</el-button>
             </router-link>
          </span>
        </el-dialog>
      </main>
    </div>
  </div>
</template>

<script>
  import {getList, countCoin, preview, getLoanInfo, getLoanInfoNotLogin, getAddress, postLoan} from "@/api/loan";
  import {coin} from "@/api/coin";
  import {Message} from 'element-ui';
  import {mapGetters,mapMutations} from 'vuex'


  export default {
    name: "Loan",
    filters: {
      toUpperCase(str) {
        return str.toUpperCase()
      },
      formatDate(time) {
        var data = new Date(time)
        var year = data.getFullYear()
        var month = data.getMonth() < 10 ? '0' + data.getMonth() : data.getMonth()
        var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
        return year + '-' + month + '-' + day
      },
      toMoreZero(str) {
        return str || '0.00000000'
      },
      toZero(str) {
        return str || '0.00'
      },
      toBlank(str) {
        return str || '--'
      },
      addUnit(str) {
        return str ? str + '天' : '--'
      }
    },
    data() {
      return {
        coin: this.$route.query.coin || 'btc',
        countParam: {
          coinId:'1f93e212ff5349f3b4e626b2167e9cab',
          total: '',
          days: ''
        },
        coinInfo: {
          price: '',
          loanRatio: '',
          poundage: '',
          quantity: '',
          realTotal: ''
        },
        isAgree: '',
        userInfo: {
          isReal: ''
        },
        postData: '',
        loanId: '',
        order: '',
        previewContractUrl: '',
        dialogVisible: false
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(['token']),
      notBlank() {
        return this.countParam.days && this.countParam.total
      }
    },
    methods: {
      ...mapMutations(['setLoading']),
      selectCoin(index) {
        var preCoin = this.coin
        switch (index) {
          case 'btc':
            this.coin = 'btc';
            this.countParam.coinId = '1f93e212ff5349f3b4e626b2167e9cab';
            break;
          case 'eth':
            this.coin = 'eth';
            this.countParam.coinId = 'f5c960a6b7724c6884f7e67c3d813e58';
            break;
          case 'ltc':
            this.coin = 'ltc';
            this.countParam.coinId = 'f663a358985a11e8b390fcaa14748ba3';
            break;
          case 'etc':
            this.coin = 'etc';
            this.countParam.coinId = 'fc4f9f90985a11e8b390fcaa14748ba3';
            break;
          case 'gtc':
            this.coin = 'gtc';
            this.countParam.coinId = '2afc9cf15854455889d7262047f2bbd6';
            break;
        }
        if (preCoin !== this.coin) {
          this.countCoinTotal()
        }

      },
      countCoinTotal() {
        if (this.countParam.days && this.countParam.total) {
          this.setLoading(true)
          countCoin(this.countParam).then(res => {
            this.setLoading(false)
            this.coinInfo = res

            this.date = new Date()
            if (this.token) {
              preview({
                coinId: this.countParam.coinId,
                coinPrice: this.coinInfo.price,
                coinQuantity: this.coinInfo.quantity,
                days: this.countParam.days,
                total: this.countParam.total
              }).then(res => {

                this.postData = res
                this.previewContractUrl = res.previewContractUrl
                delete this.postData.previewContractUrl
              })
            }
          })
        }
      },
      reminder(e) {
        e.preventDefault()
        if (this.token) {
          Message({
            message: '请先填写借款金额和天数',
            type: 'error'
          })
        } else {
          Message({
            message: '请登录',
            type: 'error'
          })
        }

      },
      goLoan() {
        if (this.token) {
          if (this.isAgree) {
            this.getIdentify().then(() => {
              if (this.userInfo.isReal) {
                postLoan(this.postData)
                  .then(res => {
                    this.$router.push({path: '/loan/pledge/make', query: {loanId: res.id}})
                  })
                  .catch(res => {
                    this.loanId = res.data.id
                    getAddress(res.data.id).then(res => {
                      this.order = res
                      this.$router.push({path: '/loan/pledge', query: {order: this.order, loanId: this.loanId}})
                    })
                  })
              } else {
                this.dialogVisible = true
              }
            })
          } else {
            Message({
              message: '同意借款协议才可借款',
              type: 'error'
            })
          }
        } else {
          this.$router.push('/auth/login')
          Message({
            message: '请登录',
            type: 'error'
          })
        }
      },
      getIdentify() {
        return new Promise((resolve, reject) => {
          getLoanInfo().then(res => {
            this.userInfo.isReal = res.isReal
            resolve()

          })
        })
      },
      handleClose(done) {
        done()
      },
      goBorrowRecord(){
        this.$router.push('/loan/record')
      }
    }
  }
</script>

<style scoped>
  input {
    padding-left: 12px;
  }

  input:focus {
    outline: none;
    border: 1px solid #FF8A14 !important;
  }

  input::placeholder {
    font-size: 16px;
    color: #999999;
  }

  .loan {
    background: #F5F6FA;
  }

  .container {
    margin-bottom: 80px;
    overflow: auto;
  }

  .container > nav {
    display: flex;
    margin: 30px 0 0 0;
  }

  .container > nav > div {
    background: #ffffff;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: #333333;
    height: 63px;
    width: 152px;
    line-height: 63px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ebebeb;
    cursor: pointer;
  }

  .borrowPageSelect {
    border-top: 3px solid #FF8A14;
    border-right: 1px solid #ebebeb;
    border-bottom: none !important;
    color: #FF8A14 !important;
    font-weight: bold;
  }

  .borrowRecordSelect {
    border-top: 3px solid #FF8A14;
    border-right: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    border-bottom: none !important;
    color: #FF8A14 !important;
    font-weight: bold;
  }

  .container > nav > div:nth-child(3) {
    flex-grow: 1;
    cursor: auto;
  }

  main {
    background-color: #ffffff;
    overflow: auto;
  }

  main h4 {
    display: inline-block;
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    font-weight: bold;
    color: #333333;
  }

  main h5 {
    font-size: 18px;
    color: #333333;
  }

  main h6 {
    font-size: 14px;
    color: #999999;
  }

  main > h4:nth-of-type(1) {
    margin: 31px 0 0 20px;
  }

  main > h4:nth-of-type(2) {

  }

  main > .coinsWrapper {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
  }

  main > .coinsWrapper > div {
    border: 1px solid #EAEAEA;
    height: 94px;
    width: 208px;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .selectBorder {
    border: 1px solid #FF8A14 !important;
  }

  main > .coinsWrapper > div > img:nth-child(1) {
    margin: 0 22px;
  }

  main > .coinsWrapper > div > .icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  main > .info-wrapper {
    display: flex;
  }

  main > .info-wrapper > .inputInfo {
    margin: 60px 0 0 30px;
    position: relative;
    /*overflow: fragments;*/
  }

  main > .info-wrapper > .inputInfo > .line {
    position: absolute;
    height: 190px;
    border-left: 1px solid #EAEAEA;
    top: 54px;
    right: -60px;
  }

  main > .info-wrapper > .inputInfo > .row {
    display: flex;
    margin-top: 30px;
    font-size: 16px;
    color: #333333;
  }

  main > .info-wrapper > .inputInfo > .row > span {
    line-height: 40px;
  }

  main > .info-wrapper > .inputInfo > .row > .input-wrapper {
    margin-left: 20px;
    position: relative;
  }

  main > .info-wrapper > .inputInfo > .row > .input-wrapper > input {
    width: 310px;
    height: 40px;
    border: 1px solid #EAEAEA;
    font-size: 16px;
  }

  .coin-content {
    width: 310px;
    height: 40px;
    background: #F5F6FA;
    line-height: 40px;
    padding-left: 12px;
  }

  main > .info-wrapper > .inputInfo > .row > .input-wrapper > span {
    position: absolute;
    line-height: 16px;
    top: 12px;
    right: 12px;
  }

  main > .info-wrapper > .inputInfo > h4 {
    margin-left: -10px;
  }

  main > .info-wrapper > .outputInfo {
    margin: 60px 0 0 118px;
  }

  main > .info-wrapper > .outputInfo > h4 > span {
    color: #FF8A14;
  }

  main > .info-wrapper > .outputInfo > .table-wrapper {
    border-bottom: 1px solid #EAEAEA;
    border-right: 1px solid #EAEAEA;
    margin-top: 30px;
  }

  main > .info-wrapper > .outputInfo > .table-wrapper > .row {
    display: flex;

  }

  main > .info-wrapper > .outputInfo > .table-wrapper > .row > div {
    border-top: 1px solid #EAEAEA;
    border-left: 1px solid #EAEAEA;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: #999999;
    font-size: 14px;
  }

  main > .info-wrapper > .outputInfo > .table-wrapper > .row > div > span {
    color: #333333;
  }

  main > .info-wrapper > .outputInfo > p {
    margin-top: 22px;
    display: flex;
    align-items: center;
  }

  main > .info-wrapper > .outputInfo > p > a {
    color: #FF8A14;
  }

  main > .info-wrapper > .outputInfo > p > label {
    color: #999999;
    font-size: 14px;
  }

  main > .info-wrapper > .outputInfo > button {
    width: 626px;
    height: 50px;
    border-radius: 3px;
    font-size: 18px;
    color: #ffffff;
    margin: 30px 0 80px 0;
  }


</style>
<style>
  .el-dialog {
    border-radius: 5px;
  }

  .el-dialog__header {
    padding: 0;
    height: 10px;
  }

  .el-dialog__close.el-icon.el-icon-close {
    font-size: 20px;
  }

  .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-dialog__body > p {
    margin-top: 12px;
    font-size: 18px;
  }

  .el-dialog__body > .identify {
    width: 340px;
    font-size: 16px;
    color: #666666;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }

  .el-dialog__footer button.confirmSet {
    width: 100%;
    height: 60px;
    font-size: 18px;
    margin-bottom: 18px;
    border-radius: 3px;
  }

</style>
